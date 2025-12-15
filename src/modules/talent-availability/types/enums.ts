export enum DayOfWeek {
  Monday = 'mon',
  Tuesday = 'tue',
  Wednesday = 'wed',
  Thursday = 'thu',
  Friday = 'fri',
  Saturday = 'sat',
  Sunday = 'sun',
}

/**
 * Time slots for availability
 */
export enum TimeSlot {
  AllDay = 'all_day',
  Morning = 'morning',
  Afternoon = 'afternoon',
  Evening = 'evening',
  Custom = 'custom',
  NotAvailable = 'not_available',
}

/**
 * Main availability type
 */
export enum AvailabilityType {
  AlwaysAvailable = 'always',
  SetSchedule = 'schedule',
}

/**
 * Trip availability type
 */
export enum TripAvailability {
  SameAsRegular = 'regular',
  CustomSchedule = 'custom',
  NotAvailable = 'not_available',
}
