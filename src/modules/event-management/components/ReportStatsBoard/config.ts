import { EventReportDto } from '@actions';
import { COLORS } from '@styles';
import { IStatCard } from './types';

export const getReportBoardConfig = (
  report: EventReportDto | undefined,
): IStatCard[] => [
  {
    label: 'Checked-In Talent',
    value: report?.checked_in_count ?? 0,
    bgColor: COLORS.gray_bg,
    textColor: COLORS.main,
    borderColor: COLORS.main,
    borderWidth: 1,
  },
  {
    label: 'Checked-Out Talent',
    value: report?.checked_out_count ?? 0,
    bgColor: COLORS.main,
    textColor: COLORS.white,
  },
  {
    label: 'Task Completed',
    value: report?.task_completed_count ?? 0,
    bgColor: COLORS.gray_bg,
    textColor: COLORS.main,
    borderColor: COLORS.main,
    borderWidth: 1,
  },
  {
    label: 'Talent No-Show',
    value: report?.no_show_count ?? 0,
    bgColor: COLORS.red_light,
    textColor: COLORS.red,
  },
];
