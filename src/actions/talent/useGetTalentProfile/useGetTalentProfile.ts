import { useQuery } from '@tanstack/react-query';
import { getTalentProfileAction } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useGetTalentProfile = (talentId: string | undefined) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_PROFILE, talentId],
    queryFn: () => getTalentProfileAction({ talentId: talentId! }),
    enabled: !!talentId,
  });
};
