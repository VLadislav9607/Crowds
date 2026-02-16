import { supabase } from '@services';
import { GetOrgFlagsParams, GetOrgFlagsRespDto } from './types';

export const getOrgFlagsAction = async ({
  officeId,
}: GetOrgFlagsParams): Promise<GetOrgFlagsRespDto> => {
  const { data, error } = await supabase.rpc('get_org_flags', {
    p_office_id: officeId,
  });

  if (error) {
    throw error;
  }

  return {
    data: data || [],
  };
};
