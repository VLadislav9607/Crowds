import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventCheckedInTalentsAction } from './action';

export const useGetEventCheckedInTalents = (eventId: string) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_CHECKED_IN_TALENTS, eventId],
    staleTime: 0,
    queryFn: () => getEventCheckedInTalentsAction(eventId),
  });
};
