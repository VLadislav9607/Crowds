import { COLORS } from '@styles';
import { BoardItemType, IBoardConfig } from './types';
import { formatInTimeZone } from 'date-fns-tz';

export const getBoardConfig = (
  checkinOpensAt: string | null,
  checkinClosesAt: string | null,
  eventTimezone: string,
): IBoardConfig[] => [
  {
    type: BoardItemType.CHECKIN_OPENS,
    label: 'Check-in opens',
    bgColor: COLORS.main,
    textColor: COLORS.white,
    value: checkinOpensAt
      ? formatInTimeZone(checkinOpensAt, eventTimezone, 'HH:mm')
      : '--:--',
  },
  {
    type: BoardItemType.CHECKIN_CLOSES,
    label: 'Check-in closes',
    bgColor: COLORS.gray_bg,
    textColor: COLORS.black,
    borderColor: COLORS.main,
    borderWidth: 1,
    value: checkinClosesAt
      ? formatInTimeZone(checkinClosesAt, eventTimezone, 'HH:mm')
      : '--:--',
  },
];
