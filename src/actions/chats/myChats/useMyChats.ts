import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { fetchMyChatsAction } from './action';

export const useMyChats = () => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.MY_CHATS],
    queryFn: fetchMyChatsAction,
  });
};
