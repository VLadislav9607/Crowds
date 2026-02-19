import { useQuery } from '@tanstack/react-query';
import { getEventDetailsForTalent } from './action';
import { UseGetEventDetailsForTalentBodyDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useGetEventDetailsForTalent = (
  params: UseGetEventDetailsForTalentBodyDto,
) => {
  return useQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_EVENT_DETAILS_FOR_TALENT,
      params.event_id,
    ],
    queryFn: async () => await getEventDetailsForTalent(params),
    enabled: !!params.event_id,
  });
};
