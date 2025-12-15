import { ImperativeModalRef } from "@hooks";

export interface TalentEventApplyConfirmModalProps{
  eventId: string;
  onConfirm: () => void;
}

export type TalentEventApplyConfirmModalRef = ImperativeModalRef<TalentEventApplyConfirmModalProps>;