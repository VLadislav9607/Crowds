import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { revokeTeamInvitationAction } from './action';
import { RevokeTeamInvitationResDto } from './types';

export const useRevokeTeamInvitation = (
  options?: IMutationOptions<RevokeTeamInvitationResDto>,
) => {
  return useMutation({
    mutationFn: revokeTeamInvitationAction,
    ...options,
  });
};
