export interface UpdateTeamMemberCapabilitiesBodyDto {
  officeMemberId: string;
  roleAccess: Record<string, string[]>;
}

export interface UpdateTeamMemberCapabilitiesResDto {
  success: boolean;
}
