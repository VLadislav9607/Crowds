import { supabase } from '@services';
import { GetTalentFullProfileBodyDto, GetTalentFullProfileRespDto } from './types';

export const getTalentFullProfileAction = async (
  params: GetTalentFullProfileBodyDto,
): Promise<GetTalentFullProfileRespDto> => {
  const { data, error } = await supabase
    .rpc('get_talent_profile', {
      p_talent_id: params.talentId,
    })
    .single();

  if (error) throw error;
  if (!data) throw new Error('Talent not found');

  return data as unknown as GetTalentFullProfileRespDto;
};
