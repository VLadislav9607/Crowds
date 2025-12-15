import { ImperativeModalRef } from "@hooks";

export interface TalentEventCheckinModalProps{
  eventId: string;
  onConfirm: () => void;
}

export type TalentEventCheckinModalRef = ImperativeModalRef<TalentEventCheckinModalProps>;