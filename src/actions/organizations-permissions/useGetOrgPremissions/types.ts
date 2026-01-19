import { Enums, Tables } from '@services';

export interface UseGetOrgPremissionsResDto {
  groupedPermissions: Record<
    Enums<'OrgPermissionsCategories'>,
    Tables<'organization_permissions'>[]
  >;
  permissions: Tables<'organization_permissions'>[];
}
