import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { SyncConnectAccountStatusResDto } from './types';

export const syncConnectAccountStatusAction =
  async (): Promise<SyncConnectAccountStatusResDto> => {
    const { data, error } = await supabase.functions.invoke(
      'sync-connect-account-status',
      { body: {} },
    );

    if (error && error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      throw errorMessage;
    }

    if (error) {
      throw error;
    }

    return data;
  };
