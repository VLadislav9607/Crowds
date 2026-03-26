import { useEffect } from 'react';

import { realtimeService } from '@services';
import { useGetMe } from '@actions';
import { chatsCache } from '../../cache';

export const useChatsRealtime = (enabled = true) => {
  const { me } = useGetMe();

  useEffect(() => {
    if (!me?.id || !enabled) return;

    const subscribe = () => {
      realtimeService.subscribe({
        channelName: `chats-updates: ${me?.id}`,
        table: 'chats',
        event: 'UPDATE',
        onPayload: payload => {
          const chat = payload.new as any;
          const oldChat = payload.old as any;

          // Only mark as unread if last_message_at is newer (new message, not edit/delete)
          const isNewMessage =
            chat.last_message_at &&
            oldChat?.last_message_at &&
            chat.last_message_at > oldChat.last_message_at;

          chatsCache.updateChat({
            chatId: chat.id,
            lastMessage: chat.last_message_text ?? null,
            lastMessageAt: chat.last_message_at ?? null,
            ...(isNewMessage ? { hasUnread: true } : {}),
          });

        },
      });
    };

    subscribe();

    return () => realtimeService.unsubscribe(`chats-updates: ${me?.id}`);
  }, [me?.id, enabled]);
};
