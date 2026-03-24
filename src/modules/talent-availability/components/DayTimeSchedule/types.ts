import { IDaySchedule } from '../../types';

export interface DayTimeScheduleProps {
  mode: 'days';
  schedules: IDaySchedule[];
  onChange: (schedules: IDaySchedule[]) => void;
  label?: string;
}
