export interface ConfirmEventPublicationBodyDto {
  eventId: string;
  paymentIntentId: string;
}

export interface ConfirmEventPublicationResDto {
  eventId: string;
  status: 'published' | 'already_published' | 'aml_pending' | 'aml_blocked';
  message?: string;
}
