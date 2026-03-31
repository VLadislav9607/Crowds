import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { IMutationOptions } from '@services';
import { toggleCustomTaskAction } from './action';
import { ToggleCustomTaskParams, ToggleCustomTaskResDto } from './types';
import { EventDetailsForTalentDto } from '../useGetEventDetailsForTalent/types';

export const useToggleCustomTask = (
  options?: IMutationOptions<ToggleCustomTaskResDto>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: toggleCustomTaskAction,
    onMutate: async (variables: ToggleCustomTaskParams) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_DETAILS_FOR_TALENT],
      });

      // Snapshot previous value
      const previousQueries = queryClient.getQueriesData<EventDetailsForTalentDto>({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_DETAILS_FOR_TALENT],
      });

      // Optimistically toggle the task
      queryClient.setQueriesData<EventDetailsForTalentDto>(
        { queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_DETAILS_FOR_TALENT] },
        old => {
          if (!old?.custom_tasks) return old;
          return {
            ...old,
            custom_tasks: old.custom_tasks.map(task =>
              task.id === variables.task_id
                ? { ...task, is_completed: !task.is_completed }
                : task,
            ),
          };
        },
      );

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      // Rollback on error
      if (context?.previousQueries) {
        for (const [queryKey, data] of context.previousQueries) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};
