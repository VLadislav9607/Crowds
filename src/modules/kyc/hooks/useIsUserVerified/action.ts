import { supabase } from '@services';
import { UserKycRecord } from './types';

export const fetchUserKycStatus = async (
  userId: string,
): Promise<UserKycRecord | null> => {
  const { data, error } = await (supabase as any)
    .from('user_kyc')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned - user has no KYC record
      return null;
    }
    throw error;
  }

  return data as UserKycRecord;
};
