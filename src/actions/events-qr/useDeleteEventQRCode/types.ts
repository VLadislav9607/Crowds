export interface DeleteEventQRCodeBodyDto {
  qr_id: string;
  event_id: string;
}

export interface DeleteEventQRCodeResDto {
  success: boolean;
}
