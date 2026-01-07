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

export const SendMessageInput = ({ chatId }: SendMessageInputProps) => {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const { mutateAsync, isPending } = useSendMessage();
  const { me } = useGetMe();

  const handleChange = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = useCallback(async () => {
    const trimmed = message.trim();
    if (!trimmed || !chatId) return;

    // Create optimistic message
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const optimisticMessage = {
      id: tempId,
      text: trimmed,
      created_at: new Date().toISOString(),
      sender_identity_id: me?.id || '',
      is_mine: true,
    };

    // Add message optimistically
    messagesCache.addMessage({
      chatId,
      message: optimisticMessage,
    });

    try {
      setMessage('');

      await mutateAsync({ chatId, text: trimmed });
    } catch (error) {
      // Remove optimistic message on error
      messagesCache.removeMessage({
        chatId,
        messageId: tempId,
      });
      console.log('send-message error', error);
    }
  }, [chatId, message, mutateAsync, me?.id]);

  return (
    <View style={[styles.container, { paddingBottom: bottom || 16 }]}>
      <TextInput
        placeholder="Type your message"
        style={styles.input}
        value={message}
        onChangeText={handleChange}
        editable={!isPending}
        returnKeyType="send"
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
