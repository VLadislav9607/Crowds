import { Tables } from '@services';

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
      locations: Tables<'organizations_locations'>[];
    };
  };
}
