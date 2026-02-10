import { IWithPaginationResponse } from '@services';

export interface GetMatchingTalentsBodyDto {
  eventId: string;
  search?: string;
  distance?: number;
  offset?: number;
  limit?: number;
}

export interface GetMatchingTalentDto {
  id: string;
  flag: string;
  first_name: string;
  last_name: string;
  avatar_path: string;
  location?: {
    city?: string;
    country?: string;
  };
}

export interface GetMatchingTalentsRespDto
  extends IWithPaginationResponse<GetMatchingTalentDto> {}
