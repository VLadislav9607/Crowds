import { TANSTACK_QUERY_KEYS } from '@constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCustomListTalentsAction } from './action';
import { GetCustomListTalentsParams } from './types';

export const useCustomListInvitableTalents = (
  params: GetCustomListTalentsParams,
) => {
  const limit = 20;

  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_CUSTOM_LIST_TALENTS,
      params.eventId,
      'custom-list',
      params.listId,
      params.search,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = ((pageParam as number) - 1) * limit;
      return await getCustomListTalentsAction({
        eventId: params.eventId,
        listId: params.listId,
        limit: limit,
        offset,
        search: params.search,
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
