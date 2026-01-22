export interface InvitableTalentsBodyDto {
  eventId: string;
  offset: number;
  search: string;
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
}
