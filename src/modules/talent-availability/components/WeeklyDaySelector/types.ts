import { DayOfWeek, IDaySchedule } from '../../types';

export interface IWeeklyDaySelectorProps {
  selectedDays: DayOfWeek[];
  daySchedules: IDaySchedule[];
  onChange: (days: DayOfWeek[]) => void;
  onSchedulesChange: (schedules: IDaySchedule[]) => void;
  label?: string;
}
