import type { ActiveFlagRow } from '@actions';

export interface YellowFlagInviteWarningModalProps {
  isVisible: boolean;
  flag: ActiveFlagRow | null;
  onClose: () => void;
  onConfirm: () => void;
  isInviting?: boolean;
  /** Primary action button label (e.g. "Invite", "Accept") */
  confirmLabel?: string;
  /** Question below the notice (e.g. for accept: "Would you like to accept their application anyway?") */
  questionText?: string;
}
