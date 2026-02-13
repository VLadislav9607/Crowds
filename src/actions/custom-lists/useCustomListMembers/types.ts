import { EventParticipantStatus } from '@actions';

export interface GetCustomListTalentsBodyDto {
  listId: string;
  eventId: string;
  limit: number;
  offset: number;
  search?: string;
}

export interface CustomListTalentDto {
  is_in_list?: boolean;
  id: string;
  flag: string;
  first_name: string;
  last_name: string;
  avatar_path: string;
  city: string;
  country: string;
  total: number;
  participation_status: EventParticipantStatus;
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
}
