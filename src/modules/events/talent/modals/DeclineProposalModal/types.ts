export interface DeclineProposalModalProps {
  participationId: string | null;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}
