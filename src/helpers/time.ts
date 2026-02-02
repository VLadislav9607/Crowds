import { getTimezoneOffset } from 'date-fns-tz';
import * as RNLocalize from 'react-native-localize';

/**
 * Returns time difference in HOURS between event timezone
 * and user's current device timezone.
 *
 * Positive  → event is ahead of user
 * Negative  → event is behind user
 * Zero      → same timezone
 */
export function getTimezoneOffsetHours(
  eventTimeZone?: string,
  atDate: Date = new Date(),
): number {
  if (!eventTimeZone) return 0;

  const userTimeZone = RNLocalize.getTimeZone();

  const eventOffsetHours = getTimezoneOffset(eventTimeZone, atDate) / 3600000;

  const userOffsetHours = getTimezoneOffset(userTimeZone, atDate) / 3600000;

  return eventOffsetHours - userOffsetHours;
}
