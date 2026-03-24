import { supabase } from '@services';
import {
  GetEventTaskCompletionsParams,
  GetEventTaskCompletionsRespDto,
  TaskCompletionTalentDto,
} from './types';

export const getEventTaskCompletionsAction = async (
  params: GetEventTaskCompletionsParams,
): Promise<GetEventTaskCompletionsRespDto> => {
  const { data, error } = await supabase.rpc('get_event_task_completions', {
    p_event_id: params.eventId,
    p_limit: 20,
    p_offset: params.offset ?? 0,
  });

  if (error) throw error;

  const items = Array.isArray(data)
    ? (data as unknown as TaskCompletionTalentDto[]).filter(
        (item): item is TaskCompletionTalentDto => item != null,
      )
    : [];

  return {
    data: items,
    pagination: {
      offset: params.offset ?? 0,
    },
  };
};
