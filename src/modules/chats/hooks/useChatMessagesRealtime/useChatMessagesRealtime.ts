import { useEffect } from 'react';

import { realtimeService, queryClient } from '@services';
import { ChatMessage, useGetMe, IChatParticipant } from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { messagesCache, chatsCache } from '../../cache';

interface IParams {
  chatId: string;
  limit?: number;
}

export const useChatMessagesRealtime = ({ chatId, limit = 50 }: IParams) => {
  const { isTalent } = useGetMe();

  useEffect(() => {
    const subscribe = async () => {
      realtimeService.subscribe({
        channelName: `chat:${chatId}`,
        table: 'chat_messages',
        event: 'INSERT',
        filter: `chat_id=eq.${chatId}`,
        onPayload: payload => {
          const message = payload.new as ChatMessage;
          if (!message) return;

          messagesCache.addOrReplaceMessage({
            chatId,
            message: {
              id: message.id,
              text: message.text,
              created_at: message.created_at,
              sender_id: message.sender_id,
            },
            limit,
          });

          // Refetch participants if sender is unknown (e.g. new talent in group chat)
          const participantsKey = [TANSTACK_QUERY_KEYS.GET_CHAT_PARTICIPANTS, chatId];
          const participants = queryClient.getQueryData<IChatParticipant[]>(participantsKey);
          const senderKnown = participants?.some(p => p.user_id === message.sender_id);
          if (!senderKnown) {
            queryClient.refetchQueries({ queryKey: participantsKey });
          }

          // Update chat cache with last message info
          chatsCache.updateChat({
            chatId,
            lastMessage: message.text,
            lastMessageAt: message.created_at,
            hasUnread: false,
          });
        },
      });
    };

    subscribe();

    return () => realtimeService.unsubscribe(`chat:${chatId}`);
  }, [chatId, limit, isTalent]);
};
