import { IDaySchedule, IDateSchedule } from '../../types';

// Props for day of week mode
export interface IDayTimeScheduleProps {
  mode: 'days';
  schedules: IDaySchedule[];
  onChange: (schedules: IDaySchedule[]) => void;
  label?: string;
}

// Props for date mode
export interface IDateTimeScheduleProps {
  mode: 'dates';
  schedules: IDateSchedule[];
  onChange: (schedules: IDateSchedule[]) => void;
  label?: string;
}

export type DayTimeScheduleProps =
  | IDayTimeScheduleProps
  | IDateTimeScheduleProps;
