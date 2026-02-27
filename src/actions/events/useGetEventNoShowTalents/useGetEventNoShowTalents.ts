import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventNoShowTalentsAction } from './action';

export const useGetEventNoShowTalents = (eventId: string) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_NO_SHOW_TALENTS, eventId],
    staleTime: 0,
    queryFn: () => getEventNoShowTalentsAction(eventId),
  });
};
