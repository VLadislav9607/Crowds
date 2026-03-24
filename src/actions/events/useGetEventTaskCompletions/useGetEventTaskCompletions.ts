import { TANSTACK_QUERY_KEYS } from '@constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getEventTaskCompletionsAction } from './action';

const PAGE_SIZE = 20;

export const useGetEventTaskCompletions = (eventId: string) => {
  return useInfiniteQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_TASK_COMPLETIONS, eventId],
    staleTime: 0,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = ((pageParam as number) - 1) * PAGE_SIZE;
      return await getEventTaskCompletionsAction({ eventId, offset });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};
