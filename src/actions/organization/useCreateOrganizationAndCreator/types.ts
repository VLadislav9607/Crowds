import { Database } from "@services";

export interface CreateOrganizationLocation {
  address: string;
  city: string;
  country: string;
  region: string;
  is_head_office: boolean;
}

export interface CreateOrganizationOwner {
  first_name: string;
  last_name: string;
  gender: Database["public"]["Enums"]["Gender"];
  position: string;
  username: string;
  email: string;
}

export interface CreateOrganizationBodyDto {
  organization_name: string;
  password: string;
  verification_token: string;
  location?: CreateOrganizationLocation;
  owner: CreateOrganizationOwner;
}

export interface CreateOrganizationResponseDto {
  success: boolean;
}

export interface CreateOrganizationResDto {
    success: boolean;
    organization: Database["public"]["Tables"]["organizations"]["Row"];
    uin: string;
    organization_member: Database["public"]["Tables"]['organizations_members']["Row"];
    session: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        expires_at: number;
    };
}