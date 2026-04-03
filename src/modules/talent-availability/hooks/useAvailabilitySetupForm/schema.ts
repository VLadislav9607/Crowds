import { z } from 'zod';
import { DayOfWeek, TimeSlot, AvailabilityType } from '../../types';

const timeSlotSchema = z.enum(TimeSlot);
const dayOfWeekSchema = z.enum(DayOfWeek);

const baseScheduleSchema = z.object({
  timeSlot: timeSlotSchema,
  customFrom: z.date().optional(),
  customTo: z.date().optional(),
});

export const availabilitySetupSchema = z
  .object({
    availability: z.enum(AvailabilityType),
    selectedDays: z.array(dayOfWeekSchema),
    daySchedules: z.array(baseScheduleSchema.extend({ day: dayOfWeekSchema })),
  })
  .refine(
    data => {
      if (data.availability === AvailabilityType.SetSchedule) {
        return data.selectedDays.length > 0;
      }
      return true;
    },
    {
      message: 'Please select at least one day',
      path: ['selectedDays'],
    },
  );

export type AvailabilitySetupFormData = z.infer<typeof availabilitySetupSchema>;

export const DEFAULT_VALUES: AvailabilitySetupFormData = {
  availability: AvailabilityType.AlwaysAvailable,
  selectedDays: [],
  daySchedules: [],
};
