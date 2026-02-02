import { useInfiniteQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { IInfinityQueryOptions } from '@services';

import { getChatMessagesAction } from './action';
import { ChatMessage, GetChatMessagesBodyDto } from './types';

export const useGetChatMessages = (
  params: GetChatMessagesBodyDto,
  options?: IInfinityQueryOptions<ChatMessage[]>,
) => {
  return useInfiniteQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_CHAT_MESSAGES, JSON.stringify(params)],
    initialPageParam: null,
    staleTime: 0,
    queryFn: ({ pageParam }) =>
      getChatMessagesAction({
        ...params,
        cursor: (pageParam as string | null) ?? null,
      }),
    getNextPageParam: lastPage => {
      // If we got fewer messages than the limit, there are no more pages
      const limit = params.limit ?? 50;
      if (lastPage.length < limit) {
        return undefined;
      }
      // Return the created_at of the last message as cursor
      if (lastPage.length > 0) {
        return lastPage[lastPage.length - 1].created_at;
      }
      return undefined;
    },
    ...options,
  });
};
