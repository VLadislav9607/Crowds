import { supabase } from '@services';
import { UseGetEventQRCodesBodyDto, UseGetEventQRCodesResDto } from './types';

export const getEventsInEventsFolderAction = async (
  body: UseGetEventQRCodesBodyDto,
): Promise<UseGetEventQRCodesResDto> => {
  const { data, error } = await supabase.rpc('get_event_qr_codes', {
    p_event_id: body.event_id,
    p_limit: body.limit,
    p_offset: body.offset,
  });
  if (error) throw error;
  return data as unknown as UseGetEventQRCodesResDto;
};
