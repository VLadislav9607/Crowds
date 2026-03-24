import { supabase } from '@services';
import { EventPaymentDto } from './types';

export const getEventPaymentAction = async (
  eventId: string,
): Promise<EventPaymentDto | null> => {
  const { data, error } = await supabase
    .rpc('get_event_payment', { p_event_id: eventId })
    .single();

  if (error) {
    throw error;
  }

  return data as unknown as EventPaymentDto | null;
};
