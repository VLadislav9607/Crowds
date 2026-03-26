import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useSendMessage, useEditMessage, useGetMe } from '@actions';
import { showErrorToast } from '@helpers';
import { IconButton, AppText } from '@ui';
import { ICONS } from '@assets';

import { COLORS } from '@styles';
import { styles } from './styles';
import { messagesCache } from '../../cache';

interface SendMessageInputProps {
  chatId: string;
  editingMessage?: { id: string; text: string; isEdited?: boolean } | null;
  onCancelEdit?: () => void;
  onEditSuccess?: () => void;
}

const MIN_INPUT_HEIGHT = 32;
const MAX_INPUT_HEIGHT = 120;

export const SendMessageInput = ({
  chatId,
  editingMessage,
  onCancelEdit,
  onEditSuccess,
}: SendMessageInputProps) => {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage();
  const { mutateAsync: editMessage, isPending: isEditing } = useEditMessage();
  const { me } = useGetMe();

  const isEditMode = !!editingMessage;
  const isPending = isSending || isEditing;

  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.text);
    }
  }, [editingMessage]);

  const handleChange = (text: string) => {
    setMessage(text);
  };

  const handleContentSizeChange = (event: any) => {
    const { height } = event.nativeEvent.contentSize;
    const newHeight = Math.min(
      Math.max(height, MIN_INPUT_HEIGHT),
      MAX_INPUT_HEIGHT,
    );
    setInputHeight(newHeight);
  };

  const handleCancelEdit = () => {
    setMessage('');
    setInputHeight(MIN_INPUT_HEIGHT);
    onCancelEdit?.();
  };

  const handleEditMessage = useCallback(async () => {
    if (!editingMessage) return;

    const trimmedText = message.trim();
    if (!trimmedText || trimmedText === editingMessage.text) {
      handleCancelEdit();
      return;
    }

    // Optimistic update
    messagesCache.updateMessage({
      chatId,
      messageId: editingMessage.id,
      updates: { text: trimmedText, is_edited: true },
    });

    setMessage('');
    setInputHeight(MIN_INPUT_HEIGHT);
    onEditSuccess?.();

    try {
      await editMessage({
        messageId: editingMessage.id,
        text: trimmedText,
      });
    } catch {
      // Revert optimistic update (preserve original is_edited state)
      messagesCache.updateMessage({
        chatId,
        messageId: editingMessage.id,
        updates: { text: editingMessage.text, is_edited: editingMessage.isEdited ?? false },
      });
      showErrorToast('Failed to edit message');
    }
  }, [chatId, message, editingMessage, editMessage, onEditSuccess]);

  const handleSendMessage = useCallback(async () => {
    setMessage('');
    setInputHeight(MIN_INPUT_HEIGHT);

    const tempId = `temp-${Date.now()}-${Math.random()}`;

    const optimisticMessage = {
      id: tempId,
      text: message.trim(),
      created_at: new Date().toISOString(),
      sender_id: me?.id || '',
    };

    messagesCache.addMessage({
      chatId,
      message: optimisticMessage,
    });

    try {
      const result = await sendMessage({
        chatId,
        text: message.trim(),
      });

      messagesCache.addOrReplaceMessage({
        chatId,
        message: {
          id: result.id,
          text: result.text,
          created_at: result.created_at,
          sender_id: result.sender_id,
        },
      });
    } catch {
      messagesCache.removeMessage({ chatId, messageId: tempId });
      showErrorToast('You can no longer send messages in this chat');
    }
  }, [chatId, message, sendMessage, me?.id]);

  const handleSubmit = isEditMode ? handleEditMessage : handleSendMessage;

  return (
    <View style={[styles.container, { paddingBottom: bottom || 16 }]}>
      {isEditMode && (
        <TouchableOpacity onPress={handleCancelEdit} style={styles.cancelEditButton}>
          <AppText typography="medium_12" color="red">
            Cancel
          </AppText>
        </TouchableOpacity>
      )}

      <TextInput
        placeholder={isEditMode ? 'Edit message' : 'Type your message'}
        placeholderTextColor={COLORS.black_40}
        style={[styles.input, { height: inputHeight }]}
        value={message}
        onChangeText={handleChange}
        onContentSizeChange={handleContentSizeChange}
        editable={!isPending}
        returnKeyType="send"
        multiline
        textAlignVertical="top"
        autoFocus={isEditMode}
      />

      <IconButton
        icon={ICONS.sendMessage(message?.trim() ? 'main' : 'gray')}
        iconSize={20}
        disabled={isPending || !message.trim()}
        onPress={handleSubmit}
        style={[styles.sendButton, message.trim() && styles.activeSendButton]}
      />
    </View>
  );
};
