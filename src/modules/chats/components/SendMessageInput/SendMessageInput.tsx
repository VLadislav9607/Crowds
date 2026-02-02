import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useSendMessage, useGetMe } from '@actions';
import { IconButton } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';
import { messagesCache } from '../../cache';

interface SendMessageInputProps {
  chatId: string;
}

const MIN_INPUT_HEIGHT = 32;
const MAX_INPUT_HEIGHT = 120;

export const SendMessageInput = ({ chatId }: SendMessageInputProps) => {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);
  const { mutateAsync, isPending } = useSendMessage();
  const { me } = useGetMe();

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

  const handleSendMessage = useCallback(async () => {
    setMessage('');
    setInputHeight(MIN_INPUT_HEIGHT);

    // Create optimistic message
    const tempId = `temp-${Date.now()}-${Math.random()}`;

    const optimisticMessage = {
      id: tempId,
      text: message.trim(),
      created_at: new Date().toISOString(),
      sender_id: me?.id || '',
    };

    // Add message optimistically
    messagesCache.addMessage({
      chatId,
      message: optimisticMessage,
    });

    try {
      await mutateAsync({
        chatId,
        text: message.trim(),
      });
    } catch (error) {
      console.log('send-message error', error);

      // Remove optimistic message on error
      messagesCache.removeMessage({
        chatId,
        messageId: tempId,
      });
    }
  }, [chatId, message, mutateAsync, me?.id]);

  return (
    <View style={[styles.container, { paddingBottom: bottom || 16 }]}>
      <TextInput
        placeholder="Type your message"
        style={[styles.input, { height: inputHeight }]}
        value={message}
        onChangeText={handleChange}
        onContentSizeChange={handleContentSizeChange}
        editable={!isPending}
        returnKeyType="send"
        multiline
        textAlignVertical="top"
      />

      <IconButton
        icon={ICONS.sendMessage(message?.trim() ? 'main' : 'gray')}
        iconSize={20}
        disabled={isPending || !message.trim()}
        onPress={handleSendMessage}
        style={[styles.sendButton, message.trim() && styles.activeSendButton]}
      />
    </View>
  );
};
