import { TANSTACK_QUERY_KEYS } from '@constants';
import { getTeamMembersAction } from './action';
import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { TeamMemberItem, GetTeamMembersParams } from './types';

export const useGetTeamMembers = (
  params: GetTeamMembersParams,
  options?: IQueryOptions<TeamMemberItem[]>,
) => {
  return useQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_TEAM_MEMBERS,
      params.organizationNetworkId,
    ],
    queryFn: () => getTeamMembersAction(params),
    enabled: !!params.organizationNetworkId,
    ...options,
  });
};
