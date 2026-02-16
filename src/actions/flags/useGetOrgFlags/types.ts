export type OrgFlagRowDto = {
  id: string;
  description: string | null;
  created_at: string;
  flag_type: string;
  reason: string | null;
  created_by_name: string | null;
  brand_id: string | null;
  event_name: string | null;
};

export interface GetOrgFlagsParams {
  officeId: string;
}

export interface GetOrgFlagsRespDto {
  data: OrgFlagRowDto[];
}
