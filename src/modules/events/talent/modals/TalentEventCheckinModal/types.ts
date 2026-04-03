import { ImperativeModalRef } from '@hooks';

export interface TalentEventCheckinModalProps {
  eventTitle: string;
  brandLogoPath: string | null;
  venue: string | null;
  qrCodeId: string;
  eventId: string;
  participationId: string;
  onCheckinSuccess: () => void;
}

export type TalentEventCheckinModalRef =
  ImperativeModalRef<TalentEventCheckinModalProps>;
