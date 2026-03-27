export interface RejectPaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  isLoading?: boolean;
}
