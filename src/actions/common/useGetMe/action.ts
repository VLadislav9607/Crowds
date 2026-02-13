import { CurrentOrganizationContext, UseGetMeResDto } from './types';
import { supabase } from '@services';

function buildCurrentContext(
  orgMember: NonNullable<UseGetMeResDto['organizationMember']>,
): CurrentOrganizationContext | undefined {
  const network = orgMember.organization_networks?.[0];
  if (!network) return undefined;

  // New structure: brands → office_memberships
  const brand = network.brands?.[0];
  if (brand) {
    return {
      organization_network_id: network.organization_network_id,
      brand: {
        id: brand.id,
        name: brand.name,
        logo_path: brand.logo_path,
      },
      offices: brand.office_memberships ?? [],
    };
  }

  // Legacy: office_memberships at network level (brand info in each)
  const legacyOffices = network.office_memberships;
  if (!legacyOffices?.length) return undefined;

  const first = legacyOffices[0];
  return {
    organization_network_id: network.organization_network_id,
    brand: {
      id: '',
      name: first.brand_name ?? '',
      logo_path: first.brand_logo_path ?? '',
    },
    offices: legacyOffices.map(o => ({
      office_id: o.office_id,
      country_code: o.country_code,
      member_id: o.member_id,
      is_super_admin: o.is_super_admin,
      capabilities: o.capabilities,
    })),
  };
}

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
    const { data: orgMemberData, error: orgMemberError } = await (
      supabase.rpc as any
    )('get_my_org_user');
    if (orgMemberError) throw orgMemberError;

    const organizationMember =
      orgMemberData as unknown as UseGetMeResDto['organizationMember'];
    const current_context = organizationMember
      ? buildCurrentContext(organizationMember)
      : undefined;

    return {
      isTalent: false,
      isOrganizationMember: true,
      organizationMember: organizationMember
        ? { ...organizationMember, current_context }
        : undefined,
    };
  }
};
