import { IEventParticipant } from '@modules/common';

export type EventParticipantStatus = 'pending' | 'approved' | 'rejected';
export type EventParticipantInitiatedBy = 'organization' | 'talent';

export interface EventParticipantsByStatusBodyDto {
  eventId: string;
  status: EventParticipantStatus;
  initiatedBy?: EventParticipantInitiatedBy;
  limit?: number;
  offset?: number;
}

export interface EventParticipantsByStatusRespDto {
  data: IEventParticipant[];
  pagination: {
    offset: number;
  };
}
