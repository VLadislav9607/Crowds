import { useMutation } from '@tanstack/react-query';

import { createBlackFlagReportAction } from './action';
import { IMutationOptions } from '@services';
import { CreateBlackFlagReportRespDto } from './types';

export const useCreateBlackFlagReport = (
  options?: IMutationOptions<CreateBlackFlagReportRespDto>,
) => {
  return useMutation({
    mutationFn: createBlackFlagReportAction,
    ...options,
  });
};
