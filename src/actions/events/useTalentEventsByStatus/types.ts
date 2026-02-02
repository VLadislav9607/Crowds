import { Enums, IWithPaginationResponse, Tables } from '@services';

// export interface ITalentEventCard {
//   participant?: {
//     id: string;
//     status: 'pending' | 'approved' | 'rejected';
//     initiated_by: 'organization' | 'talent';
//   } | null;
//   location:{
//     city?: string;
//     country?: string;
//     formatted_address?: string;
//   },
//   event_id: string;
//   brief: string;
//   category_id: string;
//   title: string;
//   payment_amount: number;
//   payment_mode: string;
//   start_at: string;
//   end_at: string;
//   max_participations: number;
//   created_at: string;
//   can_reaccept?: boolean;
//   is_in_any_folder?: boolean;
// }

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
}
export interface UseTalentEventsByStatusResDto
  extends IWithPaginationResponse<TalentParticipationEvent[]> {}
