import { useQuery } from '@tanstack/react-query';
import { getEventForOrgMember } from './action';
import { UseGetEventByOrgMemberBodyDto } from './types';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useGetEventForOrgMember = (
  params: UseGetEventByOrgMemberBodyDto,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER, params.event_id],
    queryFn: async () => await getEventForOrgMember(params),
    enabled: !!params.event_id,
  });
};

export const prefetchEventForOrgMember = async (
  params: UseGetEventByOrgMemberBodyDto,
) => {
  return await queryClient.fetchQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER, params.event_id],
    queryFn: async () => await getEventForOrgMember(params),
  });
};
