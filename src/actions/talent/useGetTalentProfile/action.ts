import { supabase } from '@services';
import { GetTalentProfileBodyDto, GetTalentProfileRespDto } from './types';

export const getTalentProfileAction = async (
  params: GetTalentProfileBodyDto,
): Promise<GetTalentProfileRespDto> => {
  const { data, error } = await supabase
    .rpc('get_talent_profile', {
      p_talent_id: params.talentId,
    })
    .single();

  if (error) throw error;
  if (!data) throw new Error('Talent not found');

  return data as unknown as GetTalentProfileRespDto;
};
