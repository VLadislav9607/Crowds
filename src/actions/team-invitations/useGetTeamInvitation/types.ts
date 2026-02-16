export interface GetTeamInvitationResDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  roleAccess: Record<string, string[]>;
  status: string;
  expiresAt: string;
  inviterName: string;
  brandName: string;
}
