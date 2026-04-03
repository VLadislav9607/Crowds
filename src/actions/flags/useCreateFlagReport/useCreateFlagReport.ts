import { useMutation } from '@tanstack/react-query';

import { createFlagReportAction } from './action';
import { IMutationOptions } from '@services';
import { CreateFlagReportRespDto } from './types';

export const useCreateFlagReport = (
  options?: IMutationOptions<CreateFlagReportRespDto>,
) => {
  return useMutation({
    mutationFn: createFlagReportAction,
    ...options,
  });
};
