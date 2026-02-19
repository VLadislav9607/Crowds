export interface CancelEventBodyDto {
  eventId: string;
  reason: string;
}

export interface CancelEventResDto {
  eventId: string;
  status: 'cancelled';
  isWithin5Days: boolean;
  notifiedTalents: number;
}
