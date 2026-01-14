export interface ITalentEvent {
  participationId: string;
  eventId: string;
  description: string;
  categoryId: string;
  eventTitle: string;
  paymentAmount: number;
  paymentMode: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  startAt: string;
  endAt: string;
  participantsCount: number;
  createdAt: string;
}

export interface UseTalentEventsByStatusBodyDto {
  status: 'pending' | 'approved' | 'rejected';
  initiatedBy?: 'organization' | 'talent';
  offset?: number;
}

export interface UseTalentEventsByStatusResDto {
  data: ITalentEvent[];
  pagination: {
    offset: number;
  };
}
