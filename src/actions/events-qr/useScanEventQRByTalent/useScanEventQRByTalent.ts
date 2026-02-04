import { useMutation } from '@tanstack/react-query';
import { scanEventQRByTalentAction } from './action';
import { ScanEventQRByTalentResDto } from './types';
import { IMutationOptions } from '@services';

export const useScanEventQRByTalent = (
  options?: IMutationOptions<ScanEventQRByTalentResDto>,
) => {
  return useMutation({
    mutationFn: scanEventQRByTalentAction,
    ...options,
  });
};
