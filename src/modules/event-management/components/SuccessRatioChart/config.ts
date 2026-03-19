import { EventReportDto } from '@actions';
import { COLORS } from '@styles';

export const getPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

export const getPieData = (
  report: EventReportDto | undefined,
  total: number,
) => {
  if (!report || total === 0) {
    return [{ value: 1, color: COLORS.light_gray3 }];
  }
  return [
    {
      value: report.task_completed_count,
      color: COLORS.main,
      text: getPercentage(report.task_completed_count, total),
    },
    {
      value: report.no_show_count,
      color: COLORS.red,
      text: getPercentage(report.no_show_count, total),
    },
    {
      value: report.checked_in_count,
      color: COLORS.gray,
      text: getPercentage(report.checked_in_count, total),
    },
  ];
};

export const LEGEND_ITEMS = [
  {
    label: 'Task Completed by Talents',
    color: COLORS.main,
  },
  {
    label: 'Checked-In Talents',
    color: COLORS.gray,
  },
  {
    label: 'No Show Talents',
    color: COLORS.red,
  },
];
