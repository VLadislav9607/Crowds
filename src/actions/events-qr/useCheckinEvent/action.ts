import { supabase } from '@services';
import { CheckinEventBodyDto, CheckinEventResDto } from './types';

export const checkinEventAction = async (
  body: CheckinEventBodyDto,
): Promise<CheckinEventResDto> => {
  const { data, error } = await supabase.rpc('talent_checkin_event', {
    p_qr_code_id: body.qr_code_id,
  });

  if (error) throw error;
  return data as CheckinEventResDto;
};
