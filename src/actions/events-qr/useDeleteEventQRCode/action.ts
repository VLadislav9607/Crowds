import { supabase } from '@services';
import { DeleteEventQRCodeBodyDto, DeleteEventQRCodeResDto } from './types';

export const deleteEventQRCodeAction = async (
  body: DeleteEventQRCodeBodyDto,
): Promise<DeleteEventQRCodeResDto> => {
  const { error } = await supabase.rpc('delete_event_qr_code', {
    p_qr_id: body.qr_id,
  });

  if (error) {
    throw error;
  }

  return { success: true };
};
