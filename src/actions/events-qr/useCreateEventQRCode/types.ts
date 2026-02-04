export interface CreateEventQRCodeBodyDto {
  name: string;
  start_at: string;
  end_at: string;
  event_id: string;
}

export interface CreateEventQRCodeResDto {
  success: boolean;
}
