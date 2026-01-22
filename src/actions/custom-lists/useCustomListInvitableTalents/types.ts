import { EventParticipantStatus } from "@actions";

export interface GetCustomListTalentsBodyDto {
  eventId: string;
  listId: string;
  limit: number;
  offset: number;
  search: string;
}

export interface CustomListTalentDto {
  id: string;
  first_name: string;
  last_name: string;
  avatar_path: string;
  city: string;
  country: string;
  is_in_list: boolean;
  total: number;
  status: EventParticipantStatus;
}

export interface GetCustomListTalentsRespDto {
  data: CustomListTalentDto[];
  pagination: {
    offset: number;
    total: number;
  };
}


export interface GetCustomListTalentsParams {
  eventId: string;
  listId: string;
  search: string;
}