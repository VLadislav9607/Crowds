import { useMutation } from '@tanstack/react-query';
import { bucketUploadAction } from './action';
import { IMutationOptions } from '@services';
import { UseBucketUploadRespDto } from './types';

export const useBucketUpload = (
  options?: IMutationOptions<UseBucketUploadRespDto>,
) => {
  return useMutation({
    mutationFn: bucketUploadAction,
    ...options,
  });
};
