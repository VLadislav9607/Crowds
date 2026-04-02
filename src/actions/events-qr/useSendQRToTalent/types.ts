export interface SendQRToTalentBodyDto {
  eventId: string;
  talentId: string;
  qrPath: string;
  qrCodeName: string;
}

export interface SendQRToTalentRespDto {
  chatId: string;
}
