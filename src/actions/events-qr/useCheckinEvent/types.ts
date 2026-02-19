export interface CheckinEventBodyDto {
  qr_code_id: string;
}

export interface CheckinEventResDto {
  id: string;
  checked_in_at: string;
}
