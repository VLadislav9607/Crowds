import { supabase } from '@services';
import { EventFolder, UseGetEventsFoldersBodyDto } from './types';

export const getEventsFoldersAction = async (
  body: UseGetEventsFoldersBodyDto,
): Promise<EventFolder[]> => {
  const { data, error } = await supabase.rpc('list_talent_events_folders', {
    p_event_id: body.event_id,
  });
  if (error) throw error;
  return data as unknown as EventFolder[];
};
