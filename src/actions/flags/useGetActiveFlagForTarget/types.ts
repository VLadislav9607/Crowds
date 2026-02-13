export interface GetActiveFlagForTargetParams {
  targetType: string;
  targetId: string;
}

export interface ActiveFlagRow {
  status: string;
  flag_type: string;
  reason: string | null;
  description: string | null;
  duration_days: number | null;
  expires_on: string | null;
}

export type GetActiveFlagForTargetRespDto = ActiveFlagRow | null;
