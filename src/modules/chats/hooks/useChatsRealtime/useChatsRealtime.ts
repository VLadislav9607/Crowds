import { useEffect } from 'react';

import { realtimeService, supabase } from '@services';
import { useGetMe } from '@actions';
import { chatsCache } from '../../cache';
import { Platform } from 'react-native';

let cachedAuthUid: string | null = null;

export const useChatsRealtime = (enabled = true) => {
  const { me } = useGetMe();

  useEffect(() => {
    if (!cachedAuthUid) {
      supabase.auth.getSession().then(({ data }) => {
        cachedAuthUid = data.session?.user?.id ?? null;
      });
    }
  }, []);

  useEffect(() => {
    if (!me?.id || !enabled) return;

    const chatsUpdatesSubscription = () => {
      realtimeService.subscribe({
        channelName: `chats-updates: ${me?.id}`,
        table: 'chats',
        event: '*',
        onPayload: payload => {
          console.log(`payload ${Platform.OS}`, payload);

          const chat = payload.new as any;
          const oldChat = payload.old as any;

          // Only mark as unread if last_message_at is newer (new message, not edit/delete)
          const isNewMessage =
            chat.last_message_at &&
            oldChat?.last_message_at &&
            chat.last_message_at > oldChat.last_message_at;

          const isMine = cachedAuthUid
            ? chat.last_message_sender_id === cachedAuthUid
            : true; // If auth uid unknown yet, assume mine (don't mark unread)

          chatsCache.updateChat({
            chatId: chat.id,
            lastMessage: chat.last_message_text ?? null,
            lastMessageAt: chat.last_message_at ?? null,
            ...(isNewMessage && !isMine ? { hasUnread: true } : {}),
          });
        },
      });
    };

    chatsUpdatesSubscription();

    return () => realtimeService.unsubscribe(`chats-updates: ${me?.id}`);
  }, [me?.id, enabled]);
};
