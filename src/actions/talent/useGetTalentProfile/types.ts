import { Database } from '@services';

export interface TalentProfilePhysicalDetail {
  label: string;
  value: string;
  color?: string;
}

export interface GetTalentProfileBodyDto {
  talentId: string;
}

export interface GetTalentProfileRespDto {
  id: string;
  first_name: string;
  last_name: string;
  avatar_path: string | null;
  avatar_full_path: string | null;
  physical_details: TalentProfilePhysicalDetail[];
  tags: string[];
  bio: string | null;
  experience: string | null;
  availability: string;
  address: string | null;
  birth_date: string | null;
  gender: Database['public']['Enums']['Gender'];
}
