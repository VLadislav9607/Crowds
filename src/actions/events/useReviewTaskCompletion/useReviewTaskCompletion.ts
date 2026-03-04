import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { IMutationOptions } from '@services';
import { reviewTaskCompletionAction } from './action';
import { ReviewTaskCompletionRespDto } from './types';

export const useReviewTaskCompletion = (
  options?: IMutationOptions<ReviewTaskCompletionRespDto>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewTaskCompletionAction,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_TASK_COMPLETIONS],
      });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
