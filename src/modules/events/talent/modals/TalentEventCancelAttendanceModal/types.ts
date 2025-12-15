import { ImperativeModalRef } from "@hooks";

export interface TalentEventCancelAttendanceModalProps{
  eventId: string;
  onConfirm: () => void;
}

export type TalentEventCancelAttendanceModalRef = ImperativeModalRef<TalentEventCancelAttendanceModalProps>;