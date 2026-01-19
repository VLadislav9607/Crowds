import { TANSTACK_QUERY_KEYS } from '@constants';
import { getOrgPermissionsAction } from './action';
import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { UseGetOrgPremissionsResDto } from './types';

export const useGetOrgPremissions = (
  options?: IQueryOptions<UseGetOrgPremissionsResDto>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_PERMISSIONS],
    queryFn: getOrgPermissionsAction,
    ...options,
  });
};
