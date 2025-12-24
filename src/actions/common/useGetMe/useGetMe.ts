import { TANSTACK_QUERY_KEYS } from '@constants';
import { UseGetMeResDto } from './types';
import { getMeAction } from './action';
import { useQuery } from '@tanstack/react-query';
import { IQueryOptions, queryClient } from '@services';

export const useGetMe = (options?: IQueryOptions<UseGetMeResDto>) => {
  const { data, ...rest } = useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
    queryFn: getMeAction,
    ...options,
  });

  return {
    data,
    me: data?.isTalent ? data.talent : data?.organizationMember,
    isTalent: data?.isTalent,
    isOrganizationMember: data?.isOrganizationMember,
    ...rest,
  };
};

export const prefetchUseGetMe = async () => {
  const data = await queryClient.fetchQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
    queryFn: getMeAction,
  });

  return {
    data,
    me: data?.isTalent ? data.talent : data?.organizationMember,
  };
};
