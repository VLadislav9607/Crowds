export interface CreatePaymentIntentBodyDto {
  eventId: string;
}

export interface CreatePaymentIntentResDto {
  clientSecret: string;
  paymentIntentId: string;
  totalChargeCents: number;
  talentBudgetCents: number;
  commissionCents: number;
  surchargeCents: number;
  totalHeadcount: number;
  eventDurationHours: number | null;
}
