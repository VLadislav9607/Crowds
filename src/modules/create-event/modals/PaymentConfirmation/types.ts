import { ImperativeModalRef } from '@hooks';

export interface PaymentConfirmationData {
  eventId: string;
  talentBudgetCents: number;
  commissionCents: number;
  totalChargeCents: number;
  totalHeadcount: number;
  eventDurationHours: number | null;
  paymentMode: string | null;
  paymentAmountPerUnit: number | null;
}

export interface PaymentConfirmationOpenData extends PaymentConfirmationData {
  onConfirm: (data: PaymentConfirmationData) => Promise<void>;
}

export type PaymentConfirmationModalRef =
  ImperativeModalRef<PaymentConfirmationOpenData>;
