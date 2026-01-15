import { ImperativeModalRef } from '@hooks';

export interface TalentEventApplyConfirmModalProps {
  eventTitle: string;
  formattedAddress: string;
  startAt: string;
  endAt: string;
  onConfirm: () => void;
}

export interface TalentEventApplyConfirmModalRef
  extends ImperativeModalRef<TalentEventApplyConfirmModalProps> {
  handleSuccess: () => void;
  handleError: () => void;
}
