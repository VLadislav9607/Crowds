import { supabase } from '@services';
import { GetTalentFlagsParams, GetTalentFlagsRespDto } from './types';

export const getTalentFlagsAction = async ({
  talentId,
}: GetTalentFlagsParams): Promise<GetTalentFlagsRespDto> => {
  const { data, error } = await supabase
    .from('flags')
    .select(
      `
      id,
      description,
      created_at,
      flag_type,
      reason,
      organizations:created_by_org_id (
        organization_name
      )
    `,
    )
    .eq('target_type', 'talent')
    .eq('target_id', talentId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return { data: data ?? [] };
};
