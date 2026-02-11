import { ICountryWithFlag } from '@constants';
import { Gender } from '@modules/profile';

export interface ParsedLocation {
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
}

interface OrganizationCreatorInformationFormData {
  username: string;
  firstName: string;
  lastName: string;
  positionInCompany: string;
  email: string;
  gender: Gender;
}

export interface CreateGlobalOrgBodyDto {
  verificationToken: string;
  password: string;
  organizationName: string;
  hqCountry: ICountryWithFlag;
  opsCountry?: ICountryWithFlag;
  branches: ICountryWithFlag[];
  isLocalDecisionMaker: boolean;
  location: ParsedLocation;
  creator: OrganizationCreatorInformationFormData;
}

export interface CreateGlobalOrgResDto {
  success: boolean;
  uin: string;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
  };
}
