import { supabase } from '@services';
import { CreateEventQRCodeBodyDto, CreateEventQRCodeResDto } from './types';

export const editEventQRCodeAction = async (
  body: CreateEventQRCodeBodyDto,
): Promise<CreateEventQRCodeResDto> => {
  const { error } = await supabase.rpc('update_event_qr_code', {
    p_qr_id: body.qr_id,
    p_name: body.name,
    p_start_at: body.start_at,
    p_end_at: body.end_at,
  });

  if (error) throw error;

  return { success: true };
};
