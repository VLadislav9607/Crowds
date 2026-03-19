import { EventReportDto } from '@actions';

export interface IReportStatsBoardProps {
  report: EventReportDto | undefined;
}

export interface IStatCard {
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  borderWidth?: number;
}
