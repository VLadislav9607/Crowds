import { DayOfWeek, IDaySchedule, IDateSchedule } from '../../types';

export const DAY_NAMES: Record<DayOfWeek, string> = {
  [DayOfWeek.Monday]: 'Monday',
  [DayOfWeek.Tuesday]: 'Tuesday',
  [DayOfWeek.Wednesday]: 'Wednesday',
  [DayOfWeek.Thursday]: 'Thursday',
  [DayOfWeek.Friday]: 'Friday',
  [DayOfWeek.Saturday]: 'Saturday',
  [DayOfWeek.Sunday]: 'Sunday',
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = (date: Date): string => {
  return date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase();
};

export const formatCustomTime = (
  schedule: IDaySchedule | IDateSchedule,
): string | undefined => {
  if (
    schedule.timeSlot === 'custom' &&
    schedule.customFrom &&
    schedule.customTo
  ) {
    const from = formatTime(schedule.customFrom);
    const to = formatTime(schedule.customTo);
    return `${from}-${to}`;
  }
  return undefined;
};

export const getScheduleKey = (
  schedule: IDaySchedule | IDateSchedule,
  mode: 'days' | 'dates',
): string => {
  if (mode === 'days') {
    return (schedule as IDaySchedule).day;
  }
  return (schedule as IDateSchedule).date.toISOString();
};

export const getScheduleLabel = (
  schedule: IDaySchedule | IDateSchedule,
  mode: 'days' | 'dates',
): string => {
  if (mode === 'days') {
    return DAY_NAMES[(schedule as IDaySchedule).day];
  }
  return formatDate((schedule as IDateSchedule).date);
};
