import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { getActiveFlagForTargetAction } from './action';
import {
  GetActiveFlagForTargetParams,
  GetActiveFlagForTargetRespDto,
} from './types';

export const useGetActiveFlagForTarget = (
  options?: UseMutationOptions<
    GetActiveFlagForTargetRespDto,
    Error,
    GetActiveFlagForTargetParams
  >,
) => {
  return useMutation({
    mutationFn: getActiveFlagForTargetAction,
    ...options,
  });
};
