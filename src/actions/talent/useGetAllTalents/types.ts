import { EventParticipantStatus } from '@actions';

export interface GetAllTalentsFiltersDto {
  distance?: number;
  hairColour?: string;
  hairStyle?: string;
  eyeColour?: string;
  weight?: { min: number; max: number };
  height?: { min: number; max: number };
  facialAttributes?: string[];
  tattooSpot?: string[];
  skinTone?: string;
  isPregnant?: boolean;
  months?: string;
}

export interface GetAllTalentsBodyDto {
  eventId?: string;
  offset: number;
  search: string;
  filters?: GetAllTalentsFiltersDto | null;
}

export interface GetAllTalentDto {
  id: string;
  flag: string;
  first_name: string;
  last_name: string;
  avatar_path: string;
  location: {
    city: string;
    country: string;
  };
  participation_status?: EventParticipantStatus | null;
}

export interface GetAllTalentsRespDto {
  data: GetAllTalentDto[];
  pagination: {
    offset: number;
    total: number;
  };
}

export interface GetAllTalentsParams {
  eventId?: string;
  search: string;
  filters?: GetAllTalentsFiltersDto | null;
}
