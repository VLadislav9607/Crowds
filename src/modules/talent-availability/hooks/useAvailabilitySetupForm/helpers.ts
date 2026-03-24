import { GetUserAvailabilityResDto, UpdateAvailabilityBodyDto } from '@actions';
import { AvailabilityType } from '../../types';
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

  return {
    availability: data.availability,
    selectedDays: daySchedules.map(s => s.day),
    daySchedules,
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
  };
};
