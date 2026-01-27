import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventParticipantsCountsAction } from './action';

export const useEventParticipantsCounts = (eventId: string) => {
  const { data } = useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PARTICIPANTS_COUNTS, eventId],
    queryFn: () => getEventParticipantsCountsAction(eventId),
    staleTime: 0,
    enabled: !!eventId,
  });

  return {
    invited: data?.[0]?.invited || 0,
    applied: data?.[0]?.applied || 0,
    approved: data?.[0]?.approved || 0,
    rejected: data?.[0]?.rejected || 0,
  };
};
