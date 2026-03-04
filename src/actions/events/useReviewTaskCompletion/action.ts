import { supabase } from '@services';
import {
  ReviewTaskCompletionBodyDto,
  ReviewTaskCompletionRespDto,
} from './types';

export const reviewTaskCompletionAction = async (
  params: ReviewTaskCompletionBodyDto,
): Promise<ReviewTaskCompletionRespDto> => {
  const { data, error } = await supabase.rpc('review_task_completion', {
    p_task_completion_id: params.task_completion_id,
    p_status: params.status,
  });

  if (error) throw error;

  return data as unknown as ReviewTaskCompletionRespDto;
};
