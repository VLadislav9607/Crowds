export type FlagRowDto = {
  id: string;
  description: string | null;
  created_at: string;
  flag_type: string;
  reason: string | null;
  brand_name: string | null;
};

export interface GetTalentFlagsParams {
  talentId: string;
}

export interface GetTalentFlagsRespDto {
  data: FlagRowDto[];
}
