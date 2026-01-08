import { useEffect } from 'react';

import { realtimeService } from '@services';
import { useGetMe } from '@actions';
import { chatsCache } from '../../cache';

export const useChatsRealtime = () => {
  const { me } = useGetMe();

  useEffect(() => {
    const subscribe = () => {
      realtimeService.subscribe({
        channelName: `chats-updates: ${me?.id}`,
        table: 'chats',
        event: 'UPDATE',
        onPayload: payload => {
          const chat = payload.new as any;

          chatsCache.updateChat({
            chatId: chat.id,
            lastMessage: chat.last_message_text || undefined,
            lastMessageAt: chat.last_message_at || undefined,
            hasUnread: true,
          });
        },
      });
    };

    subscribe();

    return () => realtimeService.unsubscribe(`chats-updates: ${me?.id}`);
  }, [me?.id]);
};
