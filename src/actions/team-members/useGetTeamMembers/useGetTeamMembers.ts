import { TANSTACK_QUERY_KEYS } from '@constants';
import { getTeamMembersAction } from './action';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  createQuerySelectData,
  getInfiniteQueryFn,
  getInfiniteQueryNextPageParams,
  IInfinityQueryOptions,
} from '@services';
import { GetTeamMembersParams, GetTeamMembersResDto } from './types';

export const useGetTeamMembers = (
  params: GetTeamMembersParams,
  options?: IInfinityQueryOptions<GetTeamMembersResDto>,
) => {
  return useInfiniteQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TEAM_MEMBERS, params.brandId],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getTeamMembersAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<GetTeamMembersResDto>(),
    enabled: !!params.brandId && !!params.organizationNetworkId,
    ...options,
  });
};
