import { supabase } from '@services';
import { UpdateOrganizationBodyDto, UpdateOrganizationRespDto } from './types';

export const updateOrganizationAction = async (
  body: UpdateOrganizationBodyDto,
): Promise<UpdateOrganizationRespDto> => {
  const { data, error } = await supabase.rpc('update_organization', {
    p_organization_id: body.organization_id,
    p_organization_name: body.organization_name,
    p_avatar_path: body.avatar_path,
  });

  if (error) throw error;

  return { organization: data } as unknown as UpdateOrganizationRespDto;
};
