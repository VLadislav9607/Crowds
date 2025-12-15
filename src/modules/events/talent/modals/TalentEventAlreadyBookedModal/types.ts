import { ImperativeModalRef } from "@hooks";

export interface TalentEventAlreadyBookedModalProps{
  eventId: string;
  onConfirm: () => void;
}

export type TalentEventAlreadyBookedModalRef = ImperativeModalRef<TalentEventAlreadyBookedModalProps>;