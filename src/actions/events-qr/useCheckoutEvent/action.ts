import { supabase } from '@services';
import { CheckoutEventBodyDto, CheckoutEventResDto } from './types';

export const checkoutEventAction = async (
  body: CheckoutEventBodyDto,
): Promise<CheckoutEventResDto> => {
  const { data, error } = await supabase.rpc('talent_checkout_event', {
    p_session_id: body.session_id,
  });

  if (error) throw error;
  return data as CheckoutEventResDto;
};
