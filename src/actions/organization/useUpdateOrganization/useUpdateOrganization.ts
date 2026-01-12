import { useMutation } from '@tanstack/react-query';
import { updateOrganizationAction } from './action';
import { IMutationOptions } from '@services';
import { UpdateOrganizationRespDto } from './types';

export const useUpdateOrganization = (
  options?: IMutationOptions<UpdateOrganizationRespDto>,
) => {
  return useMutation({
    mutationFn: updateOrganizationAction,
    ...options,
  });
};
