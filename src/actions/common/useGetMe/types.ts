import { Tables } from '@services';

export interface OrganizationBranchDto
  extends Omit<
    Tables<'organization_branches'>,
    'created_at' | 'organization_id'
  > {
  locations: Tables<'organizations_locations'>[];
}
export interface UseGetMeResDto {
  isTalent: boolean;
  isOrganizationMember: boolean;
  talent?: Tables<'talents'> & {
    talent_location: Tables<'talent_location'> | null;
  };

  organizationMember?: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    onboarding_completed_step: number;
    organization_networks: OrganizationNetworkDto[];
    /** MVP: flat structure — 1 network, 1 brand, N offices. Avoid traversing arrays. */
    current_context?: CurrentOrganizationContext;
  };
}

/** New structure: network → brands → office_memberships */
export interface OrganizationNetworkDto {
  organization_network_id: string;
  brands?: BrandWithOfficeMembershipsDto[];
  /** Legacy: office_memberships at network level */
  office_memberships?: LegacyOfficeMembershipDto[];
}

export interface LegacyOfficeMembershipDto {
  office_id: string;
  country_code: string;
  brand_name: string;
  brand_logo_path: string;
  member_id: string;
  is_super_admin: boolean;
  capabilities: string[];
}

export interface BrandWithOfficeMembershipsDto {
  id: string;
  name: string;
  logo_path: string;
  office_memberships: OfficeMembershipDto[];
}

export interface OfficeMembershipDto {
  office_id: string;
  country_code: string;
  member_id: string;
  is_super_admin: boolean;
  capabilities: string[];
}

/** MVP convenience: single network + single brand + multiple offices */
export interface CurrentOrganizationContext {
  organization_network_id: string;
  brand: {
    id: string;
    name: string;
    logo_path: string;
  };
  offices: OfficeMembershipDto[];
}
