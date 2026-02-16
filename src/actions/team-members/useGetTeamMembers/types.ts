export interface TeamMemberItem {
  id: string;
  type: 'member' | 'invitation';
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  status: 'active' | 'pending';
  roleAccess: Record<string, string[]>;
  officeMemberId?: string;
  invitationId?: string;
}

export interface GetTeamMembersParams {
  organizationNetworkId: string;
}
