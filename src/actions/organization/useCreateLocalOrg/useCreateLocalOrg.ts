import { useMutation } from '@tanstack/react-query';
import { createLocalOrgAction } from './action';
import { IMutationOptions } from '@services';
import { CreateLocalOrgResDto } from './types';

export const useCreateLocalOrg = (
  options?: IMutationOptions<CreateLocalOrgResDto>,
) => {
  return useMutation({
    mutationFn: createLocalOrgAction,
    ...options,
  });
};
