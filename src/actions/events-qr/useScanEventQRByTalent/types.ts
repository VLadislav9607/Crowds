export interface ScanEventQRByTalentBodyDto {
  token: string;
}

export interface ScanQREventInfo {
  id: string;
  title: string;
  brand_logo_path: string | null;
  venue: string | null;
}

export interface ScanQRSessionInfo {
  id: string;
  checked_in_at: string;
}

export interface ScanEventQRByTalentResDto {
  action: 'checkin' | 'checkout';
  event: ScanQREventInfo;
  qr_code: {
    id: string;
    event_id: string;
    name: string;
    start_at: string;
    end_at: string;
  };
  session: ScanQRSessionInfo | null;
}
