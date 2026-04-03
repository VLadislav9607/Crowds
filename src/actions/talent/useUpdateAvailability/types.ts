import {
  AvailabilityType,
  DayOfWeek,
  IDayScheduleDto,
} from '../../../modules/talent-availability/types';

export interface UpdateAvailabilityBodyDto {
  talentId: string;
  availability: AvailabilityType;
  selectedDays: DayOfWeek[];
  daySchedules: IDayScheduleDto[];
}
