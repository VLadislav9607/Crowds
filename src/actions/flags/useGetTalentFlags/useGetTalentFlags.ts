import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { getTalentFlagsAction } from './action';
import { GetTalentFlagsParams } from './types';

export const useGetTalentFlags = ({ talentId }: GetTalentFlagsParams) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_FLAGS, talentId],
    staleTime: 0,
    queryFn: () => getTalentFlagsAction({ talentId }),
    enabled: !!talentId,
  });
};
