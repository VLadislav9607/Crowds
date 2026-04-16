import { TaskCompletionTalentDto } from '@actions';
import { COLORS } from '@styles';

export interface TaskCompletionCardProps {
  item: TaskCompletionTalentDto;
  isSelected: boolean;
  isSettled: boolean;
  onToggleSelect: () => void;
  onViewPhoto: (path: string) => void;
  onReject: (id: string) => void;
}

export const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  submitted: { label: 'Submitted', color: COLORS.main, bg: COLORS.main_10 },
  approved: { label: 'Approved', color: COLORS.green, bg: COLORS.green_20 },
  rejected: { label: 'Rejected', color: COLORS.red, bg: COLORS.red_20 },
};

export const PAYOUT_STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  paid: { label: 'Paid', color: COLORS.green, bg: COLORS.green_20 },
  approved: { label: 'Approved', color: COLORS.green, bg: COLORS.green_20 },
  failed: { label: 'Failed', color: COLORS.red, bg: COLORS.red_20 },
  rejected: { label: 'Not Paid', color: COLORS.red, bg: COLORS.red_20 },
  no_stripe: { label: 'No Bank Account', color: COLORS.red, bg: COLORS.red_20 },
};
