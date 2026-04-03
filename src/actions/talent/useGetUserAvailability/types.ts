import {
  AvailabilityType,
  IDayScheduleDto,
} from '../../../modules/talent-availability/types';

export interface GetUserAvailabilityResDto {
  user_id: string;
  availability: AvailabilityType;
  created_at: string;
  updated_at: string;
  dayschedules: IDayScheduleDto[];
}
