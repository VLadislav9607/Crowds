import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  DayOfWeek,
  TimeSlot,
  AvailabilityType,
  TripAvailability,
} from '../types';

const timeSlotSchema = z.enum(TimeSlot);

const baseScheduleSchema = z.object({
  timeSlot: timeSlotSchema,
  customFrom: z.date().optional(),
  customTo: z.date().optional(),
});

const availabilitySetupSchema = z.object({
  availability: z.enum(AvailabilityType),
  selectedDays: z.array(z.enum(DayOfWeek)),
  daySchedules: z.array(baseScheduleSchema.extend({ day: z.enum(DayOfWeek) })),
  isTraveling: z.boolean(),
  location: z.string(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  tripAvailability: z.enum(TripAvailability),
  travelDays: z.array(baseScheduleSchema.extend({ date: z.date() })),
});

export type AvailabilitySetupFormData = z.infer<typeof availabilitySetupSchema>;

export const useAvailabilitySetupForm = () => {
  const {
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<AvailabilitySetupFormData>({
    resolver: zodResolver(availabilitySetupSchema),
    defaultValues: {
      availability: AvailabilityType.AlwaysAvailable,
      selectedDays: [],
      daySchedules: [],
      isTraveling: false,
      location: '',
      startDate: null,
      endDate: null,
      tripAvailability: TripAvailability.SameAsRegular,
      travelDays: [],
    },
    mode: 'onChange',
  });

  return { setValue, watch, getValues, errors };
};
