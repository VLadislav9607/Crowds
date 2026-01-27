export interface InvitableTalentsFiltersDto {
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

export interface InvitableTalentsBodyDto {
  eventId: string;
  offset: number;
  search: string;
  filters?: InvitableTalentsFiltersDto;
}

export interface InvitableTalentDto {
  id: string;
  first_name: string;
  last_name: string;
  avatar_path: string;
  location: {
    city: string;
    country: string;
  };
}

export interface InvitableTalentsRespDto {
  data: InvitableTalentDto[];
  pagination: {
    offset: number;
    total: number;
  };
}

export interface GetInvitableTalentsParams {
  eventId: string;
  search: string;
  filters?: InvitableTalentsFiltersDto;
}
