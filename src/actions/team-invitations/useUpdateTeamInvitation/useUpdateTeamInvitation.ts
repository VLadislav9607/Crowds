import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { updateTeamInvitationAction } from './action';
import { UpdateTeamInvitationResDto } from './types';

export const useUpdateTeamInvitation = (
  options?: IMutationOptions<UpdateTeamInvitationResDto>,
) => {
  return useMutation({
    mutationFn: updateTeamInvitationAction,
    ...options,
  });
};
