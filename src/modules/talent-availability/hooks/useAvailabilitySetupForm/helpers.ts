import { GetUserAvailabilityResDto, UpdateAvailabilityBodyDto } from '@actions';
import { AvailabilityType, TimeSlot, TripAvailability } from '../../types';
import { AvailabilitySetupFormData } from './schema';

/**
 * Convert Date to time string (HH:MM:SS) for PostgreSQL time type
 */
const toTimeString = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  return date.toTimeString().split(' ')[0]; // "HH:MM:SS"
};

/**
 * Parse time string (HH:MM:SS) to Date object
 */
const parseTimeString = (time: string | null | undefined): Date | undefined => {
  if (!time) return undefined;
  const today = new Date();
  const [hours, minutes, seconds] = time.split(':').map(Number);
  today.setHours(hours, minutes, seconds || 0, 0);
  return today;
};

/**
 * Transform API response to form data
 */
export const mapApiToFormData = (
  data: GetUserAvailabilityResDto,
): AvailabilitySetupFormData => {
  const daySchedules = data.dayschedules.map(s => ({
    day: s.day,
    timeSlot: s.timeSlot,
    customFrom: parseTimeString(s.customFrom),
    customTo: parseTimeString(s.customTo),
  }));

  const travelDays = data.traveldays.map(d => ({
    date: new Date(d.date),
    timeSlot: d.timeSlot,
    customFrom: parseTimeString(d.customFrom),
    customTo: parseTimeString(d.customTo),
  }));

  return {
    availability: data.availability,
    selectedDays: daySchedules.map(s => s.day),
    daySchedules,
    isTraveling: data.is_traveling,
    location: data.location ?? '',
    startDate: data.start_date ? new Date(data.start_date) : null,
    endDate: data.end_date ? new Date(data.end_date) : null,
    tripAvailability: data.trip_availability,
    travelDays,
  };
};

/**
 * Transform form data to API payload
 */
export const mapFormDataToApi = (
  data: AvailabilitySetupFormData,
  talentId: string,
): UpdateAvailabilityBodyDto => {
  const isAlwaysAvailable =
    data.availability === AvailabilityType.AlwaysAvailable;
  const { isTraveling } = data;

  return {
    talentId,
    availability: data.availability,

    selectedDays: isAlwaysAvailable ? [] : data.selectedDays,
    daySchedules: isAlwaysAvailable
      ? []
      : data.daySchedules.map(s => ({
          day: s.day,
          timeSlot: s.timeSlot,
          customFrom: toTimeString(s.customFrom),
          customTo: toTimeString(s.customTo),
        })),

    isTraveling,
    location: isTraveling ? data.location : '',
    startDate: isTraveling
      ? data.startDate?.toISOString().split('T')[0] ?? null
      : null,
    endDate: isTraveling
      ? data.endDate?.toISOString().split('T')[0] ?? null
      : null,
    tripAvailability: isTraveling
      ? data.tripAvailability
      : TripAvailability.SameAsRegular,
    travelDays:
      isTraveling && data.tripAvailability === TripAvailability.CustomSchedule
        ? data.travelDays
            .filter(d => d.timeSlot !== TimeSlot.NotAvailable)
            .map(d => ({
              date: d.date.toISOString().split('T')[0], // YYYY-MM-DD
              timeSlot: d.timeSlot,
              customFrom: toTimeString(d.customFrom),
              customTo: toTimeString(d.customTo),
            }))
        : [],
  };
};
