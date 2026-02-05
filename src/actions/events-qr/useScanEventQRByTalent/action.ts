import { supabase, Tables } from '@services';
import { ScanEventQRByTalentBodyDto, ScanEventQRByTalentResDto } from './types';

export const scanEventQRByTalentAction = async (
  body: ScanEventQRByTalentBodyDto,
): Promise<ScanEventQRByTalentResDto> => {
  const { data, error } = await supabase.rpc('scan_qr_code_by_talent', {
    p_token: body.token,
  });

  if (error) throw error;
  return { qr_code: data as Omit<Tables<'event_qr_codes'>, 'token'> };
};
