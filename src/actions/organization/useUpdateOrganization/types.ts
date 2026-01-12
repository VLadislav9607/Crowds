import { Database } from '@services';

export interface UpdateOrganizationBodyDto {
  organization_id: string;
  organization_name?: string;
  avatar_path?: string | null;
}

export interface UpdateOrganizationRespDto {
  organization: Database['public']['Tables']['organizations']['Row'];
}
