import { supabase } from '@services';
import {
  UpdateCheckinCutoffBodyDto,
  UpdateCheckinCutoffResDto,
} from './types';

export const updateCheckinCutoffAction = async (
  body: UpdateCheckinCutoffBodyDto,
): Promise<UpdateCheckinCutoffResDto> => {
  const { data, error } = await supabase.rpc('update_event_checkin_cutoff', {
    p_event_id: body.event_id,
    p_checkin_cutoff: body.checkin_cutoff,
  } as any);

  if (error) {
    throw error;
  }

  return data as unknown as UpdateCheckinCutoffResDto;
};
