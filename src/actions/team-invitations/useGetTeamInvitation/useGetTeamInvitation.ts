import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { getTeamInvitationAction } from './action';
import { GetTeamInvitationResDto } from './types';

export const useGetTeamInvitation = (
  options?: IMutationOptions<GetTeamInvitationResDto>,
) => {
  return useMutation({
    mutationFn: getTeamInvitationAction,
    ...options,
  });
};
