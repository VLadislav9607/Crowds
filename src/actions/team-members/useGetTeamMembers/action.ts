import { supabase } from '@services';
import { TeamMemberItem, GetTeamMembersParams } from './types';

export const getTeamMembersAction = async ({
  organizationNetworkId,
}: GetTeamMembersParams): Promise<TeamMemberItem[]> => {
  const [membersRes, invitationsRes] = await Promise.all([
    supabase
      .from('office_members')
      .select(
        `
        id,
        user_id,
        office_id,
        org_users!inner (
          id,
          first_name,
          last_name,
          email,
          position,
          deleted_at
        ),
        office_member_capabilities (
          capability_id
        )
      `,
      )
      .eq('organization_network_id', organizationNetworkId),

    supabase
      .from('team_invitations')
      .select('*')
      .eq('organization_network_id', organizationNetworkId)
      .eq('status', 'pending')
      .gt('expires_at', new Date().toISOString()),
  ]);

  if (membersRes.error) throw membersRes.error;
  if (invitationsRes.error) throw invitationsRes.error;

  const membersByUserId = new Map<string, TeamMemberItem>();

  for (const member of membersRes.data ?? []) {
    const orgUser = member.org_users as unknown as {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      position: string;
      deleted_at: string | null;
    };

    if (orgUser.deleted_at) continue;

    const existing = membersByUserId.get(member.user_id);
    const capabilities = (member.office_member_capabilities ?? []).map(
      c => c.capability_id,
    );

    if (existing) {
      existing.roleAccess[member.office_id] = capabilities;
    } else {
      membersByUserId.set(member.user_id, {
        id: member.id,
        type: 'member',
        userId: orgUser.id,
        firstName: orgUser.first_name,
        lastName: orgUser.last_name,
        email: orgUser.email,
        position: orgUser.position,
        status: 'active',
        roleAccess: { [member.office_id]: capabilities },
        officeMemberId: member.id,
      });
    }
  }

  const acceptedMembers = Array.from(membersByUserId.values());

  const pendingInvitations: TeamMemberItem[] = (invitationsRes.data ?? []).map(
    inv => ({
      id: inv.id,
      type: 'invitation' as const,
      firstName: inv.first_name,
      lastName: inv.last_name,
      email: inv.email,
      position: inv.position,
      status: 'pending' as const,
      roleAccess: (inv.role_access as Record<string, string[]>) ?? {},
      invitationId: inv.id,
    }),
  );

  return [...acceptedMembers, ...pendingInvitations];
};
