import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { fetchChatParticipantsAction } from './action';
import { IChatParticipant } from './types';

export const useChatParticipants = (chatId: string) => {
  return useQuery<IChatParticipant[]>({
    queryKey: [TANSTACK_QUERY_KEYS.GET_CHAT_PARTICIPANTS, chatId],
    queryFn: () => fetchChatParticipantsAction(chatId),
  });
};
