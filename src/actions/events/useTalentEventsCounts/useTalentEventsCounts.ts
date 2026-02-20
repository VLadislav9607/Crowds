import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getTalentEventsCountsAction } from './action';

export const useTalentEventsCounts = () => {
  const { data, refetch } = useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
    queryFn: getTalentEventsCountsAction,
  });

  return {
    proposals: data?.[0]?.proposals || 0,
    pending: data?.[0]?.pending || 0,
    approved: data?.[0]?.approved || 0,
    denied: data?.[0]?.denied || 0,
    refetch,
  };
};
