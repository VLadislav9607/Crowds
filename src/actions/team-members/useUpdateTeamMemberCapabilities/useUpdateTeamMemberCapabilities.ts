import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { updateTeamMemberCapabilitiesAction } from './action';
import { UpdateTeamMemberCapabilitiesResDto } from './types';

export const useUpdateTeamMemberCapabilities = (
  options?: IMutationOptions<UpdateTeamMemberCapabilitiesResDto>,
) => {
  return useMutation({
    mutationFn: updateTeamMemberCapabilitiesAction,
    ...options,
  });
};
