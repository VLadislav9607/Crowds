import { useInfiniteQuery } from '@tanstack/react-query';
import { getTalentEventsByStatusAction } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { UseTalentEventsByStatusBodyDto } from './types';

export const useTalentEventsByStatus = (
  params: Omit<UseTalentEventsByStatusBodyDto, 'offset'>,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS,
      params.status,
      params.initiatedBy,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = ((pageParam as number) - 1) * 20;
      return await getTalentEventsByStatusAction({
        ...params,
        offset,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than the page size, there are no more pages
      if (lastPage?.data?.length < 20) {
        return undefined;
      }

      const currentPage = allPages.length;
      return currentPage + 1;
    },
  });
};
