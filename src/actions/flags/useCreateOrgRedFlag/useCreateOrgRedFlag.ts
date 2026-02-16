import { useMutation } from '@tanstack/react-query';

import { createOrgRedFlagAction } from './action';
import { IMutationOptions } from '@services';
import { CreateOrgRedFlagRespDto } from './types';

export const useCreateOrgRedFlag = (
  options?: IMutationOptions<CreateOrgRedFlagRespDto>,
) => {
  return useMutation({
    mutationFn: createOrgRedFlagAction,
    ...options,
  });
};
