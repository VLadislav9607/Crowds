import { DayOfWeek, IDaySchedule } from '../../types';

export const DAY_NAMES: Record<DayOfWeek, string> = {
  [DayOfWeek.Monday]: 'Monday',
  [DayOfWeek.Tuesday]: 'Tuesday',
  [DayOfWeek.Wednesday]: 'Wednesday',
  [DayOfWeek.Thursday]: 'Thursday',
  [DayOfWeek.Friday]: 'Friday',
  [DayOfWeek.Saturday]: 'Saturday',
  [DayOfWeek.Sunday]: 'Sunday',
};

export const formatCustomTime = (
  schedule: IDaySchedule,
): string | undefined => {
  if (
    schedule.timeSlot === 'custom' &&
    schedule.customFrom &&
    schedule.customTo
  ) {
    const formatTime = (date: Date): string =>
      date
        .toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .toLowerCase();

    const from = formatTime(schedule.customFrom);
    const to = formatTime(schedule.customTo);
    return `${from}-${to}`;
  }
  return undefined;
};

export const getScheduleKey = (schedule: IDaySchedule): string => {
  return schedule.day;
};

export const getScheduleLabel = (schedule: IDaySchedule): string => {
  return DAY_NAMES[schedule.day];
};
