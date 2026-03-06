import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { IMutationOptions } from '@services';
import { submitTaskPhotoAction } from './action';
import { SubmitTaskPhotoRespDto } from './types';

export const useSubmitTaskPhoto = (
  options?: IMutationOptions<SubmitTaskPhotoRespDto>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: submitTaskPhotoAction,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_DETAILS_FOR_TALENT],
      });
      options?.onSuccess?.(...args);
    },
  });
};
