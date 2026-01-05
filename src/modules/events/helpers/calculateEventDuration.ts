import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  addYears,
  addMonths,
  addDays,
  addHours,
  isValid,
} from 'date-fns';

interface CalculateEventDurationRes {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  formatted: string;
}

export const calculateEventDuration = (
  startDate: string | Date,
  endDate: string | Date,
): CalculateEventDurationRes => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  const emptyResult: CalculateEventDurationRes = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    formatted: '0m',
  };

  if (!isValid(start) || !isValid(end)) return emptyResult;

  if (end < start) return emptyResult;

  const years = differenceInYears(end, start);
  let remainingDate = addYears(start, years);

  const months = differenceInMonths(end, remainingDate);
  remainingDate = addMonths(remainingDate, months);

  const days = differenceInDays(end, remainingDate);
  remainingDate = addDays(remainingDate, days);

  const hours = differenceInHours(end, remainingDate);
  remainingDate = addHours(remainingDate, hours);

  const minutes = differenceInMinutes(end, remainingDate);

  let formatted = '';

  if (years > 0 || months > 0) {
    const parts: string[] = [];
    if (years > 0) {
      parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    }
    if (months > 0) {
      parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    }
    formatted = parts.join(' ');
  } else if (days > 0) {
    const parts: string[] = [`${days}d`];
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    formatted = parts.join(' ');
  } else if (hours > 0) {
    const parts: string[] = [`${hours}h`];
    if (minutes > 0) {
      parts.push(`${minutes}m`);
    }
    formatted = parts.join(' ');
  } else if (minutes > 0) {
    formatted = `${minutes}m`;
  } else {
    formatted = '0m';
  }

  return {
    years,
    months,
    days,
    hours,
    minutes,
    formatted,
  };
};
