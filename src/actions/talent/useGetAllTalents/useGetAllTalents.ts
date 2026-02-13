import { TANSTACK_QUERY_KEYS } from '@constants';
import { getAllTalentsAction } from './action';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetAllTalentsParams } from './types';

export const useGetAllTalents = (params: GetAllTalentsParams) => {
  const limit = 20;

  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_ALL_TALENTS,
      params.eventId,
      params.search,
      params.filters,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = ((pageParam as number) - 1) * limit;
      return await getAllTalentsAction({
        eventId: params.eventId,
        offset,
        search: params.search,
        filters: params.filters,
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
