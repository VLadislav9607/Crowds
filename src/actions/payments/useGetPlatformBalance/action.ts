import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { PlatformBalanceDto } from './types';

export const getPlatformBalanceAction =
  async (): Promise<PlatformBalanceDto> => {
    const { data, error } = await supabase.functions.invoke(
      'get-platform-balance',
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
