import { UseGetMeResDto } from './types';
import { supabase } from '@services';

export const getMeAction = async (): Promise<UseGetMeResDto> => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  if (data?.user?.app_metadata?.isTalent) {
    const { data: talent, error: talentError } = await supabase
      .from('talents')
      .select('*, talent_location!talent_id(*)')
      .eq('id', data?.user?.id)
      .single();

    if (talentError) throw talentError;

    return {
      isTalent: true,
      isOrganizationMember: false,
      talent: talent,
    };
  } else {
    const { data: organizationMember, error: organizationMemberError } =
      await supabase
        .from('organizations_members')
        .select('*')
        .eq('id', data?.user?.id)
        .single();
    if (organizationMemberError) throw organizationMemberError;
    return {
      isTalent: false,
      isOrganizationMember: true,
      organizationMember,
    };
  }
};
