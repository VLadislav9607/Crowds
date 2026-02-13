export enum YellowReason {
  NO_SHOW = 'no_show',
  LATE_CANCEL = 'late_cancel',
  BAD_BEHAVIOR = 'bad_behavior',
}

export interface CreateTalentYellowFlagBodyDto {
  talentId: string;
  eventId: string;
  reason: YellowReason;
  description?: string;
}

export interface CreateTalentYellowFlagRespDto {
  talentId: string;
  eventId: string;
}
