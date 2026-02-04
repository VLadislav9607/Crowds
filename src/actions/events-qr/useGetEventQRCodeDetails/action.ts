import { supabase, Tables } from '@services';
import {
  UseGetEventQRCodeDetailsBodyDto,
  UseGetEventQRCodeDetailsResDto,
} from './types';

export const getEventQRCodeDetailsAction = async (
  body: UseGetEventQRCodeDetailsBodyDto,
): Promise<UseGetEventQRCodeDetailsResDto> => {
  const { data, error } = await supabase.rpc('get_event_qr_code', {
    p_qr_id: body.qr_id,
  });

  if (error) throw error;

  return {
    qr_code: data as unknown as Omit<Tables<'event_qr_codes'>, 'token'>,
  };
};
