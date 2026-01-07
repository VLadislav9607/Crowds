import { useInfiniteQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { IInfinityQueryOptions } from '@services';

import { getChatMessagesAction } from './action';
import { GetChatMessagesBodyDto, GetChatMessagesResDto } from './types';

export const useGetChatMessages = (
  params: GetChatMessagesBodyDto,
  options?: IInfinityQueryOptions<GetChatMessagesResDto>,
) => {
  return useInfiniteQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_CHAT_MESSAGES, JSON.stringify(params)],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getChatMessagesAction({
        ...params,
        cursor: (pageParam as string | null) ?? null,
      }),
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    ...options,
  });
};
