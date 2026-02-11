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
  // organizationMember?: Tables<'organizations_members'> & {
  //   organization: {
  //     name: string;
  //     avatar_path: string;
  //     branches: OrganizationBranchDto[];
  //   };
  // };
  organizationMember?: {
    id: '8f4c2d5e-1c3a-4a9e-9b7e-91a1f4b2a111';
    first_name: 'Bohdan';
    last_name: 'Bolyubash';
    username: 'bodyk_b';
    email: 'bohdan@example.com';
    onboarding_completed_step: 2;
    organization_networks: [
      {
        organization_network_id: 'net-uuid-111';
        office_memberships: [
          {
            office_id: 'office-uuid-1';
            country_code: 'AU';
            brand_name: 'Crowds AU';
            brand_logo_path: 'brands/crowds-au.png';
            member_id: 'member-uuid-a';
            is_super_admin: true;
            capabilities: [];
          },
        ];
      },
    ];
  };
}
