import { supabase } from '@services';
import { TaskCompletionTalentDto } from './types';

export const getEventTaskCompletionsAction = async (
  eventId: string,
): Promise<TaskCompletionTalentDto[]> => {
  const { data, error } = await supabase.rpc('get_event_task_completions', {
    p_event_id: eventId,
  });

  if (error) throw error;

  return (data as unknown as TaskCompletionTalentDto[]) ?? [];
};
