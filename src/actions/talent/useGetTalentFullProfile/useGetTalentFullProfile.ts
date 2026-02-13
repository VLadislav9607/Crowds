import { useQuery } from '@tanstack/react-query';
import { getTalentFullProfileAction } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useGetTalentFullProfile = (talentId: string | undefined) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_FULL_PROFILE, talentId],
    queryFn: () => getTalentFullProfileAction({ talentId: talentId! }),
    enabled: !!talentId,
  });
};
