export interface ITalentEventCard {
  participation_id: string;
  event_id: string;
  brief: string;
  category_id: string;
  event_title: string;
  payment_amount: number;
  payment_mode: string;
  formatted_address: string;
  start_at: string;
  end_at: string;
  max_participations: number;
  created_at: string;
  can_reaccept: boolean;
}

export interface UseTalentEventsByStatusBodyDto {
  status: 'pending' | 'approved' | 'rejected';
  initiatedBy?: 'organization' | 'talent';
  offset?: number;
}

export interface UseTalentEventsByStatusResDto {
  data: ITalentEventCard[];
  pagination: {
    offset: number;
  };
}
