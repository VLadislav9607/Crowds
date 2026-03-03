import { supabase } from '@services';
import { EventPaymentDto } from './types';

export const getEventPaymentAction = async (
  eventId: string,
): Promise<EventPaymentDto | null> => {
  const { data, error } = await supabase
    .from('event_payments')
    .select('*')
    .eq('event_id', eventId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
