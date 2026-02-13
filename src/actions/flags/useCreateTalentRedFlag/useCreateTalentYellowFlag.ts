import { useMutation } from '@tanstack/react-query';

import { createTalentYellowFlagAction } from './action';
import { IMutationOptions } from '@services';
import { CreateTalentYellowFlagRespDto } from './types';

export const useCreateTalentYellowFlag = (
  options?: IMutationOptions<CreateTalentYellowFlagRespDto>,
) => {
  return useMutation({
    mutationFn: createTalentYellowFlagAction,
    ...options,
  });
};
