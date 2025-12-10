import { COLORS } from '@styles';
import { BoardItemType, IBoardConfig } from './types';

export const boardConfig: IBoardConfig[] = [
  {
    type: BoardItemType.CURRENT_TIME,
    label: 'Current time',
    bgColor: COLORS.gray_bg,
    textColor: COLORS.main,
    borderColor: COLORS.main,
    borderWidth: 1,
    value: new Date().toLocaleTimeString().slice(0, 5),
  },
  {
    type: BoardItemType.CHECK_IN_CUTOFF,
    label: 'Check in cutoff',
    bgColor: COLORS.main,
    textColor: COLORS.white,
    value: new Date(new Date().getTime() + 10 * 60 * 1000)
      .toLocaleTimeString()
      .slice(0, 5),
  },
  {
    type: BoardItemType.CHECKED_IN,
    label: 'Checked In',
    bgColor: COLORS.green,
    textColor: COLORS.white,
    value: '251',
  },
  {
    type: BoardItemType.MISSING,
    label: 'Missing',
    bgColor: COLORS.red,
    textColor: COLORS.white,
    value: '93',
  },
];
