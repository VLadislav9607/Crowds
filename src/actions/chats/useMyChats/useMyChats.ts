import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { fetchMyChatsAction } from './action';
import { IQueryOptions } from '@services';
import { MyChatItem } from './types';

export const useMyChats = (options?: IQueryOptions<MyChatItem[]>) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.MY_CHATS],
    queryFn: fetchMyChatsAction,
    ...options,
  });
};
