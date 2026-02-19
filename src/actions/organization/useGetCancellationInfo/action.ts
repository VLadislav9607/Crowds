import { supabase } from '@services';
import { CancellationInfoDto } from './types';

export const getCancellationInfoAction = async (
  eventId: string,
): Promise<CancellationInfoDto> => {
  const { data, error } = await supabase
    .rpc('get_cancellation_info', {
      p_event_id: eventId,
    })
    .single();

  if (error) throw error;
  if (!data) throw new Error('Failed to get cancellation info');

  return data as unknown as CancellationInfoDto;
};
