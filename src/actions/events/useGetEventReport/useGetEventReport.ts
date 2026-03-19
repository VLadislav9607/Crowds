import { useQuery } from '@tanstack/react-query';
import { getEventReport } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useGetEventReport = (eventId: string) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_REPORT, eventId],
    queryFn: async () => await getEventReport(eventId),
    staleTime: 0,
    enabled: !!eventId,
  });
};
