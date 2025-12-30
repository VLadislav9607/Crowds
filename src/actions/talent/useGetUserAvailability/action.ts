import { supabase } from '@services';
import { GetUserAvailabilityResDto } from './types';

export const getUserAvailabilityAction =
  async (): Promise<GetUserAvailabilityResDto | null> => {
    const { data, error } = await supabase
      .from('user_availability_full')
      .select('*')
      .single();

    // PGRST116 = no rows found, which is valid (user hasn't set availability yet)
    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data as GetUserAvailabilityResDto | null;
  };
