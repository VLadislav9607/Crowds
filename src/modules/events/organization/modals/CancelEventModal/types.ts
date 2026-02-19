export interface CancelEventModalProps {
  eventId: string;
  eventName: string;
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
