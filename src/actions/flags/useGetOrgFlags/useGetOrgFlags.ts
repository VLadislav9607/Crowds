import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { getOrgFlagsAction } from './action';
import { GetOrgFlagsParams } from './types';

export const useGetOrgFlags = ({ officeId }: GetOrgFlagsParams) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_FLAGS, officeId],
    staleTime: 0,
    queryFn: () => getOrgFlagsAction({ officeId }),
    enabled: !!officeId,
  });
};
