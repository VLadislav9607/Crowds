export interface InvitableTalentsBodyDto {
  eventId: string;
  offset: number;
}

export interface InvitableTalentsRespDto {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_path: string;
    location: {
      city: string;
      country: string;
    };
  }[];
  pagination: {
    offset: number;
    total: number;
  };
}
