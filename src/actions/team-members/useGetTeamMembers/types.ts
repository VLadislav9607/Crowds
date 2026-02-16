import { IWithPaginationResponse } from '@services';

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
  invitationToken?: string;
}

export interface GetTeamMembersParams {
  brandId: string;
  organizationNetworkId: string;
  offset?: number;
  limit?: number;
}

export interface GetTeamMembersResDto
  extends IWithPaginationResponse<TeamMemberItem[]> {}
