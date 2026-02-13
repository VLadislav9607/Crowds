import type { ActiveFlagRow } from '@actions';

export interface YellowFlagInviteWarningModalProps {
  isVisible: boolean;
  flag: ActiveFlagRow | null;
  onClose: () => void;
  onConfirm: () => void;
  isInviting?: boolean;
}
