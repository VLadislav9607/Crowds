import { useMutation } from '@tanstack/react-query';
import { createGlobalOrgAction } from './action';
import { IMutationOptions } from '@services';
import { CreateGlobalOrgResDto } from './types';

export const useCreateGlobalOrg = (
  options?: IMutationOptions<CreateGlobalOrgResDto>,
) => {
  return useMutation({
    mutationFn: createGlobalOrgAction,
    ...options,
  });
};
