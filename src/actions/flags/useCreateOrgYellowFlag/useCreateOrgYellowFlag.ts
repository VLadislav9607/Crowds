import { useMutation } from '@tanstack/react-query';

import { createOrgYellowFlagAction } from './action';
import { IMutationOptions } from '@services';
import { CreateOrgYellowFlagRespDto } from './types';

export const useCreateOrgYellowFlag = (
  options?: IMutationOptions<CreateOrgYellowFlagRespDto>,
) => {
  return useMutation({
    mutationFn: createOrgYellowFlagAction,
    ...options,
  });
};
