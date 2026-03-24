export interface TalentDecision {
  talentId: string;
  approved: boolean;
}

export interface ProcessEventSettlementBodyDto {
  eventId: string;
  talentDecisions: TalentDecision[];
}

export interface ProcessEventSettlementResDto {
  eventId: string;
  status: 'settled' | 'already_settled';
}
