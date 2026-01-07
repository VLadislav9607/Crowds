import { differenceInYears, format, parse, isValid } from 'date-fns';

/**
 * Calculate age from birth date
 * @param birthDate - Date object, string, or undefined
 * @returns Age in years or 0 if invalid
 */
export const calculateAge = (
  birthDate: Date | string | undefined | null,
): number => {
  if (!birthDate) return 0;

  const date = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;

  if (!isValid(date)) return 0;

  return differenceInYears(new Date(), date);
};

/**
 * Check if a person is at least a certain age
 * @param birthDate - Date object or string
 * @param minAge - Minimum age required
 * @returns boolean
 */
export const isAtLeastAge = (
  birthDate: Date | string | undefined | null,
  minAge: number,
): boolean => {
  return calculateAge(birthDate) >= minAge;
};

/**
 * Format date to a specific format
 * @param date - Date object or string
 * @param formatString - date-fns format string (default: 'yyyy-MM-dd')
 * @returns Formatted date string or empty string if invalid
 */
export const formatDate = (
  date: Date | string | undefined | null,
  formatString: string = 'yyyy-MM-dd',
): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(dateObj)) return '';

  return format(dateObj, formatString);
};

/**
 * Parse date string to Date object
 * @param dateString - Date string
 * @param formatString - Expected format (default: 'yyyy-MM-dd')
 * @returns Date object or null if invalid
 */
export const parseDate = (
  dateString: string,
  formatString: string = 'yyyy-MM-dd',
): Date | null => {
  const parsed = parse(dateString, formatString, new Date());
  return isValid(parsed) ? parsed : null;
};


