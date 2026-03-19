import { supabase } from '@services';
import { EventReportDto } from './types';

export const getEventReport = async (
  eventId: string,
): Promise<EventReportDto> => {
  const { data, error } = await supabase.rpc('get_event_report', {
    p_event_id: eventId,
  });

  if (error) throw error;
  if (!data) throw new Error('Event report not found');

  return data as unknown as EventReportDto;
};
