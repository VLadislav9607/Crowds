import { supabase } from '@services';
import { ConnectAccountDto } from './types';

export const getConnectAccountAction =
  async (): Promise<ConnectAccountDto | null> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('stripe_connect_accounts')
      .select('*')
      .eq('talent_id', user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  };
