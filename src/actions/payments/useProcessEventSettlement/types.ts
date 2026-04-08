export interface TalentDecision {
  talentId: string;
  approved: boolean;
  rejectionReason?: string;
}

export interface ProcessEventSettlementBodyDto {
  eventId: string;
  talentDecisions: TalentDecision[];
}

export interface FailedPayout {
  talentId: string;
  reason: 'no_connect_account' | 'transfer_failed';
}

export interface ProcessEventSettlementResDto {
  eventId: string;
  status: 'settled' | 'already_settled';
  failedPayouts: FailedPayout[];
}
