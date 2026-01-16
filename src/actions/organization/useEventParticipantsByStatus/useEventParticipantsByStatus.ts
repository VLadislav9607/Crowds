import { TANSTACK_QUERY_KEYS } from '@constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getEventParticipantsByStatusAction } from './action';
import { EventParticipantsByStatusBodyDto } from './types';

export const useEventParticipantsByStatus = (
  params: Omit<EventParticipantsByStatusBodyDto, 'offset'>,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.EVENT_PARTICIPANTS_BY_STATUS,
      JSON.stringify(params),
    ],
    staleTime: 0,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = ((pageParam as number) - 1) * 20;
      return await getEventParticipantsByStatusAction({
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
