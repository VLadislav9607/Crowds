import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getOrgEventsCountersAction } from './action';
import { UseGetOrgEventsCountersBodyDto } from './types';

export const useGetOrgEventsCounters = (
  body: UseGetOrgEventsCountersBodyDto,
) => {
  return useQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_ORG_EVENTS_COUNTERS,
      JSON.stringify(body),
    ],
    staleTime: Infinity,
    queryFn: async () => await getOrgEventsCountersAction(body),
    enabled: !!body,
  });
};
