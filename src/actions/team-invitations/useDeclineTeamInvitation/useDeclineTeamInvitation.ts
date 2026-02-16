import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { declineTeamInvitationAction } from './action';
import { DeclineTeamInvitationResDto } from './types';

export const useDeclineTeamInvitation = (
  options?: IMutationOptions<DeclineTeamInvitationResDto>,
) => {
  return useMutation({
    mutationFn: declineTeamInvitationAction,
    ...options,
  });
};
