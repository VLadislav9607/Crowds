import { supabase } from '@services';
import {
  GetTalentPaymentHistoryBodyDto,
  GetTalentPaymentHistoryResDto,
} from './types';

export const getTalentPaymentHistoryAction = async (
  body: GetTalentPaymentHistoryBodyDto,
): Promise<GetTalentPaymentHistoryResDto> => {
  const { data, error } = await supabase.rpc('get_talent_payment_history', {
    p_tab: body.tab,
    p_limit: 20,
    p_offset: body.offset ?? 0,
  });

  if (error) throw error;

  return data as unknown as GetTalentPaymentHistoryResDto;
};
