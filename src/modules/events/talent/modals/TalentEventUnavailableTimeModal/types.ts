import { ImperativeModalRef } from "@hooks";

export interface TalentEventUnavailableTimeModalProps{
  eventId: string;
  onConfirm: () => void;
}

export type TalentEventUnavailableTimeModalRef = ImperativeModalRef<TalentEventUnavailableTimeModalProps>;