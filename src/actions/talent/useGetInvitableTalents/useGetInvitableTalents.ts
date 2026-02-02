import { TANSTACK_QUERY_KEYS } from '@constants';
import { getInvitableTalentsAction } from './action';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetInvitableTalentsParams } from './types';

export const useGetInvitableTalents = (params: GetInvitableTalentsParams) => {
  const limit = 20;

  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_INVITABLE_TALENTS,
      params.eventId,
      params.search,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = ((pageParam as number) - 1) * limit;
      return await getInvitableTalentsAction({
        eventId: params.eventId,
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
  });
};
