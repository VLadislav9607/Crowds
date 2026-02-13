import { supabase } from '@services';
import { GetTalentFlagsParams, GetTalentFlagsRespDto } from './types';

export const getTalentFlagsAction = async ({
  talentId,
}: GetTalentFlagsParams): Promise<GetTalentFlagsRespDto> => {
  const { data, error } = await supabase.rpc('get_talent_flags', {
    p_talent_id: talentId,
  });

  if (error) {
    throw error;
  }

  return {
    data: data || [],
  };
};
