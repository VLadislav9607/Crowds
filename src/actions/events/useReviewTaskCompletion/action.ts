import { supabase } from '@services';
import {
  ReviewTaskCompletionBodyDto,
  ReviewTaskCompletionRespDto,
} from './types';

export const reviewTaskCompletionAction = async (
  params: ReviewTaskCompletionBodyDto,
): Promise<ReviewTaskCompletionRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'review-task-completion',
    {
      body: {
        taskCompletionId: params.task_completion_id,
        status: params.status,
      },
    },
  );

  if (error) throw error;

  return data as ReviewTaskCompletionRespDto;
};
