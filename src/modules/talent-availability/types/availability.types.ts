import { DayOfWeek, TimeSlot } from './enums';

/**
 * Schedule for a specific day of week
 */
export interface IDaySchedule {
  day: DayOfWeek;
  timeSlot: TimeSlot;
  customFrom?: Date;
  customTo?: Date;
}

/**
 * Schedule for a specific date (used for travel)
 */
export interface IDateSchedule {
  date: Date;
  timeSlot: TimeSlot;
  customFrom?: Date;
  customTo?: Date;
}

/**
 * Day info for UI display
 */
export interface IDayInfo {
  value: DayOfWeek;
  label: string;
}

/**
 * Ordered list of days for sorting/display
 */
export const DAY_ORDER: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday,
];

/**
 * Days info for UI
 */
export const DAYS_INFO: IDayInfo[] = [
  { value: DayOfWeek.Monday, label: 'Mon' },
  { value: DayOfWeek.Tuesday, label: 'Tue' },
  { value: DayOfWeek.Wednesday, label: 'Wed' },
  { value: DayOfWeek.Thursday, label: 'Thu' },
  { value: DayOfWeek.Friday, label: 'Fri' },
  { value: DayOfWeek.Saturday, label: 'Sat' },
  { value: DayOfWeek.Sunday, label: 'Sun' },
];
