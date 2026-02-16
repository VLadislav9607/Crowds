import { supabase } from '@services';
import {
  TeamMemberItem,
  GetTeamMembersParams,
  GetTeamMembersResDto,
} from './types';

export const getTeamMembersAction = async ({
  brandId,
  organizationNetworkId,
  offset = 0,
  limit = 20,
}: GetTeamMembersParams): Promise<GetTeamMembersResDto> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  // Get office IDs belonging to this brand
  const { data: offices, error: officesError } = await supabase
    .from('offices')
    .select('id')
    .eq('brand_id', brandId);

  if (officesError) throw officesError;

  const officeIds = (offices ?? []).map(o => o.id);

  if (officeIds.length === 0) {
    return { data: [], meta: { offset, limit, total_count: 0 } };
  }

  const [membersRes, invitationsRes] = await Promise.all([
    supabase
      .from('office_members')
      .select(
        `
        id,
        user_id,
        office_id,
        office_member_capabilities (
          capability_id
        )
      `,
      )
      .in('office_id', officeIds)
      .neq('user_id', currentUserId ?? ''),

    supabase
      .from('team_invitations')
      .select('*')
      .eq('organization_network_id', organizationNetworkId)
      .eq('status', 'pending')
      .gt('expires_at', new Date().toISOString()),
  ]);

  if (membersRes.error) throw membersRes.error;
  if (invitationsRes.error) throw invitationsRes.error;

  const userIds = [...new Set((membersRes.data ?? []).map(m => m.user_id))];

  let orgUsersMap = new Map<
    string,
    {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      position: string;
      deleted_at: string | null;
    }
  >();

  if (userIds.length > 0) {
    const { data: orgUsers, error: orgUsersError } = await supabase
      .from('org_users')
      .select('id, first_name, last_name, email, position, deleted_at')
      .in('id', userIds);

    if (orgUsersError) throw orgUsersError;

    orgUsersMap = new Map((orgUsers ?? []).map(u => [u.id, u]));
  }

  const membersByUserId = new Map<string, TeamMemberItem>();

  for (const member of membersRes.data ?? []) {
    const orgUser = orgUsersMap.get(member.user_id);

    if (!orgUser) continue;

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

  // Filter invitations: only include those with role_access referencing brand offices
  const officeIdSet = new Set(officeIds);
  const pendingInvitations: TeamMemberItem[] = (invitationsRes.data ?? [])
    .filter(inv => {
      const roleAccess = inv.role_access as Record<string, string[]> | null;
      if (!roleAccess) return false;
      return Object.keys(roleAccess).some(officeId =>
        officeIdSet.has(officeId),
      );
    })
    .map(inv => ({
      id: inv.id,
      type: 'invitation' as const,
      firstName: inv.first_name,
      lastName: inv.last_name,
      email: inv.email,
      position: inv.position,
      status: 'pending' as const,
      roleAccess: (inv.role_access as Record<string, string[]>) ?? {},
      invitationId: inv.id,
      invitationToken: inv.token,
    }));

  const allItems = [...acceptedMembers, ...pendingInvitations];
  const total_count = allItems.length;
  const paginatedItems = allItems.slice(offset, offset + limit);

  return {
    data: paginatedItems,
    meta: { offset, limit, total_count },
  };
};
