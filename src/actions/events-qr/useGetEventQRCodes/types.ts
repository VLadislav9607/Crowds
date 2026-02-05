import { IWithPaginationResponse, Tables } from '@services';

export interface UseGetEventQRCodesBodyDto {
  event_id: string;
  offset?: number;
  limit?: number;
}

export interface IEventQRCode extends Omit<Tables<'event_qr_codes'>, 'token'> {}

export interface UseGetEventQRCodesResDto
  extends IWithPaginationResponse<IEventQRCode[]> {}
