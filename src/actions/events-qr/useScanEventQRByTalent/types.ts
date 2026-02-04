import { Tables } from '@services';

export interface ScanEventQRByTalentBodyDto {
  token: string;
}

export interface ScanEventQRByTalentResDto {
  qr_code: Omit<Tables<'event_qr_codes'>, 'token'>;
}
