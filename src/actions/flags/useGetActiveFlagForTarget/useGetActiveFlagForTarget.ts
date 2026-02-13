import { useMutation } from '@tanstack/react-query';
import { getActiveFlagForTargetAction } from './action';
import {
  GetActiveFlagForTargetParams,
  GetActiveFlagForTargetRespDto,
} from './types';

export const useGetActiveFlagForTarget = () => {
  return useMutation<
    GetActiveFlagForTargetRespDto,
    Error,
    GetActiveFlagForTargetParams
  >({
    mutationFn: getActiveFlagForTargetAction,
  });
};
