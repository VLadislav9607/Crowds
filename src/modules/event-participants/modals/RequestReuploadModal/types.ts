export interface RequestReuploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  isLoading?: boolean;
}
