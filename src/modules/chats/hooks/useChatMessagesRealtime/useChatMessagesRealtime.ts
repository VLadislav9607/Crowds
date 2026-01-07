import { useEffect } from 'react';

import { realtimeService, queryClient } from '@services';
import { ChatMessage, useGetMe, IChatParticipant } from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { messagesCache } from '../../cache';

interface IParams {
  chatId: string;
  limit?: number;
}

export const useChatMessagesRealtime = ({ chatId, limit = 50 }: IParams) => {
  const { me, isTalent } = useGetMe();

  useEffect(() => {
    const subscribe = async () => {
      realtimeService.subscribe({
        channelName: `chat:${chatId}`,
        table: 'messages',
        event: 'INSERT',
        filter: `chat_id=eq.${chatId}`,
        onPayload: payload => {
          const message = payload.new as ChatMessage;
          if (!message) return;

          // Get participants from cache to determine is_mine
          const participants = queryClient.getQueryData<IChatParticipant[]>([
            TANSTACK_QUERY_KEYS.GET_CHAT_PARTICIPANTS,
            chatId,
          ]);

          // Find participant with identity_id
          const participant = participants?.find(p => p.user_id === me?.id);

          messagesCache.addOrReplaceMessage({
            chatId,
            message: {
              id: message.id,
              text: message.text,
              created_at: message.created_at,
              sender_identity_id: message.sender_identity_id,
              is_mine: participant?.id === message.sender_identity_id,
            },
            limit,
          });
        },
      });
    };

    subscribe();

    return () => realtimeService.unsubscribe(`chat:${chatId}`);
  }, [chatId, limit, me?.id, isTalent]);
};
