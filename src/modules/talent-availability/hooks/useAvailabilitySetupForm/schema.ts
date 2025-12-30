import { z } from 'zod';
import {
  DayOfWeek,
  TimeSlot,
  AvailabilityType,
  TripAvailability,
} from '../../types';

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
    isTraveling: z.boolean(),
    location: z.string(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    tripAvailability: z.enum(TripAvailability),
    travelDays: z.array(baseScheduleSchema.extend({ date: z.date() })),
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
  )
  .refine(
    data => {
      if (data.isTraveling) {
        return data.location.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Please enter a location',
      path: ['location'],
    },
  )
  .refine(
    data => {
      if (data.isTraveling) {
        return data.startDate !== null && data.endDate !== null;
      }
      return true;
    },
    {
      message: 'Please select travel dates',
      path: ['startDate'],
    },
  );

export type AvailabilitySetupFormData = z.infer<typeof availabilitySetupSchema>;

export const DEFAULT_VALUES: AvailabilitySetupFormData = {
  availability: AvailabilityType.AlwaysAvailable,
  selectedDays: [],
  daySchedules: [],
  isTraveling: false,
  location: '',
  startDate: null,
  endDate: null,
  tripAvailability: TripAvailability.SameAsRegular,
  travelDays: [],
};
