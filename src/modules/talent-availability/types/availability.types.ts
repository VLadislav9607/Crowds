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
 * DTO types for API (dates as ISO strings)
 */
export interface IDayScheduleDto {
  day: DayOfWeek;
  timeSlot: TimeSlot;
  customFrom?: string | null;
  customTo?: string | null;
}

export interface IDateScheduleDto {
  date: string;
  timeSlot: TimeSlot;
  customFrom?: string | null;
  customTo?: string | null;
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
