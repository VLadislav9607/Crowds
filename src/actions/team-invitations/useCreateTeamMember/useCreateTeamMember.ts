import { useMutation } from '@tanstack/react-query';
import { createTeamMemberAction } from './action';
import { IMutationOptions } from '@services';
import { CreateTeamMemberResDto } from './types';

export const useCreateTeamMember = (
  options?: IMutationOptions<CreateTeamMemberResDto>,
) => {
  return useMutation({
    mutationFn: createTeamMemberAction,
    ...options,
  });
};
