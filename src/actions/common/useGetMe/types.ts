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
  organizationMember?: Tables<'organizations_members'> & {
    organization: {
      name: string;
      avatar_path: string;
      branches: OrganizationBranchDto[];
    };
  };
}
