import { COLORS } from '@styles';
import { BoardItemType, IBoardConfig } from './types';
import { formatInTimeZone } from 'date-fns-tz';

export const getBoardConfig = (
  checkinCutoff: string | null,
  eventTimezone: string,
): IBoardConfig[] => [
  {
    type: BoardItemType.CURRENT_TIME,
    label: 'Current time',
    bgColor: COLORS.gray_bg,
    textColor: COLORS.main,
    borderColor: COLORS.main,
    borderWidth: 1,
    value: formatInTimeZone(new Date(), eventTimezone, 'HH:mm'),
  },
  {
    type: BoardItemType.CHECK_IN_CUTOFF,
    label: 'Check in cutoff',
    bgColor: COLORS.main,
    textColor: COLORS.white,
    value: checkinCutoff
      ? formatInTimeZone(checkinCutoff, eventTimezone, 'HH:mm')
      : '--:--',
  },
];
