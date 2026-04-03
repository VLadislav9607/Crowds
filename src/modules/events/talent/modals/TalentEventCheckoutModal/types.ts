import { ImperativeModalRef } from '@hooks';

export interface TalentEventCheckoutModalProps {
  eventTitle: string;
  brandLogoPath: string | null;
  venue: string | null;
  sessionId: string;
  eventId: string;
  isEarlyCheckout?: boolean;
  onCheckoutSuccess: () => void;
}

export type TalentEventCheckoutModalRef =
  ImperativeModalRef<TalentEventCheckoutModalProps>;
