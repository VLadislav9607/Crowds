import { useMutation } from '@tanstack/react-query';
import { udateBrandAction } from './action';
import { IMutationOptions } from '@services';
import { UpdateBrandRespDto } from './types';

export const useUpdateBrand = (
  options?: IMutationOptions<UpdateBrandRespDto>,
) => {
  return useMutation({
    mutationFn: udateBrandAction,
    ...options,
  });
};
