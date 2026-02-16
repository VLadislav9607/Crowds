import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { createTeamInvitationAction } from './action';
import { CreateTeamInvitationResDto } from './types';

export const useCreateTeamInvitation = (
  options?: IMutationOptions<CreateTeamInvitationResDto>,
) => {
  return useMutation({
    mutationFn: createTeamInvitationAction,
    ...options,
  });
};
