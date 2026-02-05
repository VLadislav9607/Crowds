import { Tables } from '@services';

export interface UseGetEventQRCodeDetailsBodyDto {
  qr_id: string;
}

export interface UseGetEventQRCodeDetailsResDto {
  qr_code: Omit<Tables<'event_qr_codes'>, 'token'>;
}
