import { format } from 'date-fns';

export const formatCheckinTime = (isoString: string): string => {
  if (!isoString) return '';
  return format(new Date(isoString), 'h.mmaa').toLowerCase();
};
