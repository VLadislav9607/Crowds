import { supabase } from '@services';
import { ToggleCustomTaskParams, ToggleCustomTaskResDto } from './types';

export const toggleCustomTaskAction = async (
  params: ToggleCustomTaskParams,
): Promise<ToggleCustomTaskResDto> => {
  const { data, error } = await (supabase.rpc as any)(
    'toggle_event_custom_task',
    {
      p_task_id: params.task_id,
      p_participation_id: params.participation_id,
    },
  );

  if (error) {
    throw error;
  }

  return data as ToggleCustomTaskResDto;
};
