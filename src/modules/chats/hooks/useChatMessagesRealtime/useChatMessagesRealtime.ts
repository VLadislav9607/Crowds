import { useEffect } from 'react';

import { realtimeService, queryClient } from '@services';
import { ChatMessage, useGetMe, IChatParticipant, updateLastSeenChatAction } from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { messagesCache, chatsCache } from '../../cache';

interface IParams {
  chatId: string;
  limit?: number;
}

export const useChatMessagesRealtime = ({ chatId, limit = 50 }: IParams) => {
  const { isTalent } = useGetMe();

  useEffect(() => {
    realtimeService.subscribe({
      channelName: `chat:${chatId}`,
      table: 'chat_messages',
      filter: `chat_id=eq.${chatId}`,
      onPayload: payload => {
        const message = payload.new as ChatMessage;
        if (!message) return;

        if (payload.eventType === 'INSERT') {
          messagesCache.addOrReplaceMessage({
            chatId,
            message: {
              id: message.id,
              text: message.text,
              created_at: message.created_at,
              sender_id: message.sender_id,
              is_edited: message.is_edited,
            },
            limit,
          });

          const participantsKey = [TANSTACK_QUERY_KEYS.GET_CHAT_PARTICIPANTS, chatId];
          const participants = queryClient.getQueryData<IChatParticipant[]>(participantsKey);
          const senderKnown = participants?.some(p => p.user_id === message.sender_id);
          if (!senderKnown) {
            queryClient.refetchQueries({ queryKey: participantsKey });
          }

          updateLastSeenChatAction(chatId);

          chatsCache.updateChat({
            chatId,
            lastMessage: message.text,
            lastMessageAt: message.created_at,
            hasUnread: false,
          });
        }

        if (payload.eventType === 'UPDATE') {
          messagesCache.updateMessage({
            chatId,
            messageId: message.id,
            updates: { text: message.text, is_edited: message.is_edited },
            limit,
          });
        }

        if (payload.eventType === 'DELETE') {
          const deleted = payload.old as { id?: string };
          if (deleted?.id) {
            messagesCache.removeMessage({ chatId, messageId: deleted.id, limit });
          }
        }
      },
    });

    return () => realtimeService.unsubscribe(`chat:${chatId}`);
  }, [chatId, limit, isTalent]);
};
