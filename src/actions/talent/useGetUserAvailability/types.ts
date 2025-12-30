import {
  AvailabilityType,
  TripAvailability,
  IDayScheduleDto,
  IDateScheduleDto,
} from '../../../modules/talent-availability/types';

export interface GetUserAvailabilityResDto {
  user_id: string;
  availability: AvailabilityType;
  is_traveling: boolean;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  trip_availability: TripAvailability;
  created_at: string;
  updated_at: string;
  dayschedules: IDayScheduleDto[];
  traveldays: IDateScheduleDto[];
}
