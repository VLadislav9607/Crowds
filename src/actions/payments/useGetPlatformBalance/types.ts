export interface PlatformBalanceDto {
  stripe: {
    availableCents: number;
    pendingCents: number;
    availableByCurrency: { currency: string; amount: number }[];
    pendingByCurrency: { currency: string; amount: number }[];
  };
  reserved: {
    totalCents: number;
    talentBudgetCents: number;
    commissionCents: number;
    stripeFeesCents: number;
    pendingEventsCount: number;
    breakdown: {
      pendingSettlementCents: number;
      reviewSettlementCents: number;
      processingSettlementCents: number;
    };
  };
  safeToWithdrawCents: number;
  earnings: {
    totalCrowdsEarningsCents: number;
    totalTalentPayoutsCents: number;
    totalRefundsCents: number;
    totalCommissionEarnedCents: number;
    settledEventsCount: number;
  };
  formatted: {
    stripeAvailable: string;
    stripePending: string;
    reserved: string;
    safeToWithdraw: string;
    totalEarnings: string;
  };
}
