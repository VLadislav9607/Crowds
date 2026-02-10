import { TalentFlag } from '@modules/common';
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

    // ---- load flag ----
    const { data: flagRow } = await supabase
      .from('current_flags')
      .select('status')
      .eq('target_type', 'talent')
      .eq('target_id', data.user.id)
      .maybeSingle();

    const flag: string = flagRow?.status ?? TalentFlag.GREEN;

    return {
      isTalent: true,
      isOrganizationMember: false,
      talent: {
        ...talent,
        flag,
      },
    };
  } else {
    const { data: orgMemberData, error: orgMemberError } = await (
      supabase.rpc as any
    )('get_me_org_member');
    if (orgMemberError) throw orgMemberError;
    return {
      isTalent: false,
      isOrganizationMember: true,
      organizationMember:
        orgMemberData as unknown as UseGetMeResDto['organizationMember'],
    };
  }
};
