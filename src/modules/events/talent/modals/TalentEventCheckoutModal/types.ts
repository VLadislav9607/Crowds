import { ImperativeModalRef } from '@hooks';

export interface TalentEventCheckoutModalProps {
  eventTitle: string;
  brandLogoPath: string | null;
  venue: string | null;
  sessionId: string;
  onCheckoutSuccess: () => void;
}

export type TalentEventCheckoutModalRef =
  ImperativeModalRef<TalentEventCheckoutModalProps>;
