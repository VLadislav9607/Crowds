export interface UpdateTeamInvitationBodyDto {
  invitationId: string;
  roleAccess: Record<string, string[]>;
}

export interface UpdateTeamInvitationResDto {
  success: boolean;
}
