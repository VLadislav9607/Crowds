import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { sendQRToTalentAction } from './action';
import { SendQRToTalentRespDto } from './types';

export const useSendQRToTalent = (
  options?: IMutationOptions<SendQRToTalentRespDto>,
) => {
  return useMutation({
    mutationFn: sendQRToTalentAction,
    ...options,
  });
};
