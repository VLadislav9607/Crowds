import { Database } from '@services';

export interface CreateOrganizationLocationBodyDto {
  autocomplete_description: string;
  city: string;
  country: string;
  country_code: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
  place_id: string;
  postal_code: string;
  region: string;
  street_name: string;
  street_number: string;
  is_head_office?: boolean;
}

export interface CreateOrganizationOwner {
  first_name: string;
  last_name: string;
  gender: Database['public']['Enums']['Gender'];
  position: string;
  username: string;
  email: string;
}

export interface CreateOrganizationBranchBodyDto {
  country_code: string;
  country_name: string;
  is_headquarter: boolean;
}

export interface CreateOrganizationBodyDto {
  organization_name: string;
  password: string;
  verification_token: string;
  locations?: CreateOrganizationLocationBodyDto[];
  branches?: CreateOrganizationBranchBodyDto[];
  owner: CreateOrganizationOwner;
}

export interface CreateOrganizationResponseDto {
  success: boolean;
}

export interface CreateOrganizationResDto {
  success: boolean;
  organization: Database['public']['Tables']['organizations']['Row'];
  uin: string;
  organization_member: Database['public']['Tables']['organizations_members']['Row'];
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
  };
}
