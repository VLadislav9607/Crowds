import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventTaskCompletionsAction } from './action';

export const useGetEventTaskCompletions = (eventId: string) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_TASK_COMPLETIONS, eventId],
    staleTime: 0,
    queryFn: () => getEventTaskCompletionsAction(eventId),
  });
};
