import {
  AvailabilityType,
  TripAvailability,
  DayOfWeek,
  IDayScheduleDto,
  IDateScheduleDto,
} from '../../../modules/talent-availability/types';

export interface UpdateAvailabilityBodyDto {
  talentId: string;
  availability: AvailabilityType;
  selectedDays: DayOfWeek[];
  daySchedules: IDayScheduleDto[];
  isTraveling: boolean;
  location: string;
  startDate: string | null;
  endDate: string | null;
  tripAvailability: TripAvailability;
  travelDays: IDateScheduleDto[];
}
