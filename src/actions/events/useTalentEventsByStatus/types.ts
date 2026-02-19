import { Enums, IWithPaginationResponse, Tables } from '@services';

export interface UseTalentEventsByStatusBodyDto {
  status: 'pending' | 'approved' | 'rejected';
  initiatedBy?: 'organization' | 'talent';
  offset?: number;
}

export interface TalentParticipationEvent {
  title: string;
  brief: string;
  category_id: string;
  created_at: string;
  end_at: string;
  event_id: string;
  is_in_any_folder: boolean;
  location: {
    city?: string;
    country?: string;
    formatted_address?: string;
    timezone?: string;
  };
  max_participations: number;
  participant: Tables<'event_participations'> | null;
  payment_amount: number;
  payment_mode: Enums<'EventPaymentMode'>;
  start_at: string;
  can_reaccept?: boolean;
  office_country_code: string | null;
}
export interface UseTalentEventsByStatusResDto
  extends IWithPaginationResponse<TalentParticipationEvent[]> {}
