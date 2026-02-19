import {
  CapabilityCode,
  CurrentOrganizationContext,
  UseGetMeResDto,
} from './types';
import { TalentFlag } from '@modules/common';
import { supabase, Tables } from '@services';

function buildCapabilitiesAccess(
  offices: { is_super_admin: boolean; capabilities: string[] }[],
  allCapabilities: Tables<'capabilities'>[],
): {
  isSuperAdmin: boolean;
  capabilitiesAccess: Record<CapabilityCode, boolean>;
} {
  const isSuperAdmin = offices.some(o => o.is_super_admin);
  const capabilitiesAccess = {} as Record<CapabilityCode, boolean>;

  for (const capability of allCapabilities) {
    capabilitiesAccess[capability.code] = isSuperAdmin
      ? true
      : offices.some(o => o.capabilities.includes(capability.code));
  }

  return { isSuperAdmin, capabilitiesAccess };
}

function buildCurrentContext(
  orgMember: NonNullable<UseGetMeResDto['organizationMember']>,
  allCapabilities: Tables<'capabilities'>[],
): CurrentOrganizationContext | undefined {
  const network = orgMember.organization_networks?.[0];
  if (!network) return undefined;

  // New structure: brands → office_memberships
  const brand = network.brands?.[0];
  if (brand) {
    const offices = brand.office_memberships ?? [];
    const { isSuperAdmin, capabilitiesAccess } = buildCapabilitiesAccess(
      offices,
      allCapabilities,
    );
    return {
      organization_network_id: network.organization_network_id,
      brand: {
        id: brand.id,
        name: brand.name,
        logo_path: brand.logo_path,
      },
      offices,
      isSuperAdmin,
      capabilitiesAccess,
    };
  }

  // Legacy: office_memberships at network level (brand info in each)
  const legacyOffices = network.office_memberships;
  if (!legacyOffices?.length) return undefined;

  const first = legacyOffices[0];
  const offices = legacyOffices.map(o => ({
    office_id: o.office_id,
    country_code: o.country_code,
    member_id: o.member_id,
    is_super_admin: o.is_super_admin,
    capabilities: o.capabilities,
  }));
  const { isSuperAdmin, capabilitiesAccess } = buildCapabilitiesAccess(
    offices,
    allCapabilities,
  );

  return {
    organization_network_id: network.organization_network_id,
    brand: {
      id: '',
      name: first.brand_name ?? '',
      logo_path: first.brand_logo_path ?? '',
    },
    offices,
    isSuperAdmin,
    capabilitiesAccess,
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

    // ---- load flag ----
    const { data: flagRow } = await supabase
      .from('current_flags')
      .select('status')
      .eq('target_type', 'talent')
      .eq('target_id', data.user.id)
      .maybeSingle();

    const flag: TalentFlag =
      (flagRow?.status as TalentFlag) ?? TalentFlag.GREEN;

    return {
      isTalent: true,
      isOrganizationMember: false,
      talent: {
        ...talent,
        flag,
      },
    };
  } else {
    const [
      { data: orgMemberData, error: orgMemberError },
      { data: capabilitiesData },
    ] = await Promise.all([
      (supabase.rpc as any)('get_my_org_user'),
      supabase.from('capabilities').select('*'),
    ]);
    if (orgMemberError) throw orgMemberError;

    const organizationMember =
      orgMemberData as unknown as UseGetMeResDto['organizationMember'];
    const current_context = organizationMember
      ? buildCurrentContext(organizationMember, capabilitiesData ?? [])
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
