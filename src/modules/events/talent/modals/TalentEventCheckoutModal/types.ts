import { ImperativeModalRef } from "@hooks";

export interface TalentEventCheckoutModalProps{
  eventId: string;
  onConfirm: () => void;
}

export type TalentEventCheckoutModalRef = ImperativeModalRef<TalentEventCheckoutModalProps>;