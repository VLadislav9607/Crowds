export interface CreateTeamInvitationBodyDto {
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  roleAccess: Record<string, string[]>;
}

export interface CreateTeamInvitationResDto {
  invitationId: string;
  deepLink: string;
  expiresAt: string;
}
