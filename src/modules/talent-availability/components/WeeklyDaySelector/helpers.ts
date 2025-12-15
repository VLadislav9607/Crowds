import { DayOfWeek, TimeSlot, IDaySchedule, DAY_ORDER } from '../../types';

export const updateDaySchedules = (
  days: DayOfWeek[],
  currentSchedules: IDaySchedule[],
): IDaySchedule[] => {
  const sortedDays = [...days].sort(
    (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b),
  );

  const existingSchedules = currentSchedules.filter(s =>
    sortedDays.includes(s.day),
  );

  const newDays = sortedDays.filter(
    day => !currentSchedules.some(s => s.day === day),
  );

  const newSchedules: IDaySchedule[] = newDays.map(day => ({
    day,
    timeSlot: TimeSlot.AllDay,
  }));

  return [...existingSchedules, ...newSchedules].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day),
  );
};
