import { COLORS } from '@styles';
import { BoardItemType, IBoardConfig } from './types';
import { format } from 'date-fns';

export const getBoardConfig = (
  checkinCutoff: string | null,
): IBoardConfig[] => [
  {
    type: BoardItemType.CURRENT_TIME,
    label: 'Current time',
    bgColor: COLORS.gray_bg,
    textColor: COLORS.main,
    borderColor: COLORS.main,
    borderWidth: 1,
    value: format(new Date(), 'HH:mm'),
  },
  {
    type: BoardItemType.CHECK_IN_CUTOFF,
    label: 'Check in cutoff',
    bgColor: COLORS.main,
    textColor: COLORS.white,
    value: checkinCutoff ? format(new Date(checkinCutoff), 'HH:mm') : '--:--',
  },
];
