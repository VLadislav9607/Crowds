import { TaskCompletionTalentDto } from '@actions';
import { COLORS } from '@styles';

export interface TaskCompletionCardProps {
  item: TaskCompletionTalentDto;
  isSelected: boolean;
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
