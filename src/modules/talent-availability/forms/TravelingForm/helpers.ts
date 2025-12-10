import { TimeSlot, IDateSchedule } from '../../types';

export const generateTravelDays = (
  startDate: Date | null,
  endDate: Date | null,
): IDateSchedule[] => {
  if (!startDate || !endDate) return [];
  if (endDate < startDate) return [];

  const days: IDateSchedule[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    days.push({
      date: new Date(current),
      timeSlot: TimeSlot.NotAvailable,
    });
    current.setDate(current.getDate() + 1);
  }

  return days;
};
