import { TANSTACK_QUERY_KEYS } from '@constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCustomListTalentsAction } from './action';
import { GetCustomListTalentsParams } from './types';

export const useCustomListMembers = (params: GetCustomListTalentsParams) => {
  const limit = 10;

  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS,
      params.eventId,
      params.listId,
    ],
    initialPageParam: 1,
    staleTime: 0,
    queryFn: async ({ pageParam }) => {
      const offset = ((pageParam as number) - 1) * limit;
      return await getCustomListTalentsAction({
        listId: params.listId,
        eventId: params.eventId,
        limit,
        offset,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const { offset, total } = lastPage.pagination;
      const currentItemsCount = offset + limit;

      if (currentItemsCount >= total) {
        return undefined;
      }

      const currentPage = allPages.length;
      return currentPage + 1;
    },
    enabled: !!params.eventId && !!params.listId,
  });
};
