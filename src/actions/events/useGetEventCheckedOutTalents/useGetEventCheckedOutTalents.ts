import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventCheckedOutTalentsAction } from './action';

export const useGetEventCheckedOutTalents = (eventId: string) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_CHECKED_OUT_TALENTS, eventId],
    staleTime: 0,
    queryFn: () => getEventCheckedOutTalentsAction(eventId),
  });
};
