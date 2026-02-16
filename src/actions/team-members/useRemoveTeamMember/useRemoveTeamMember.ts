import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { removeTeamMemberAction } from './action';
import { RemoveTeamMemberResDto } from './types';

export const useRemoveTeamMember = (
  options?: IMutationOptions<RemoveTeamMemberResDto>,
) => {
  return useMutation({
    mutationFn: removeTeamMemberAction,
    ...options,
  });
};
