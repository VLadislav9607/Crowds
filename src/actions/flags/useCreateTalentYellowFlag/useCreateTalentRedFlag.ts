import { useMutation } from '@tanstack/react-query';

import { createTalentRedFlagAction } from './action';
import { IMutationOptions } from '@services';
import { CreateTalentRedFlagRespDto } from './types';

export const useCreateTalentRedFlag = (
  options?: IMutationOptions<CreateTalentRedFlagRespDto>,
) => {
  return useMutation({
    mutationFn: createTalentRedFlagAction,
    ...options,
  });
};
