import { supabase } from '@services';
import {
  UpdateCheckinOpensAtBodyDto,
  UpdateCheckinOpensAtResDto,
} from './types';

export const updateCheckinOpensAtAction = async (
  body: UpdateCheckinOpensAtBodyDto,
): Promise<UpdateCheckinOpensAtResDto> => {
  const { data, error } = await supabase.rpc('update_event_checkin_opens_at', {
    p_event_id: body.event_id,
    p_checkin_opens_at: body.checkin_opens_at,
  } as any);

  if (error) {
    throw error;
  }

  return data as unknown as UpdateCheckinOpensAtResDto;
};
