export type FlagOrganizationDto = {
  organization_name: string | null;
} | null;

export type FlagRowDto = {
  id: string;
  description: string | null;
  created_at: string;
  flag_type: string;
  reason: string | null;
  organizations: FlagOrganizationDto;
};

export interface GetTalentFlagsParams {
  talentId: string;
}

export interface GetTalentFlagsRespDto {
  data: FlagRowDto[];
}
