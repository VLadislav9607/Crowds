import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CreateConnectAccountResDto } from './types';

export const createConnectAccountAction =
  async (): Promise<CreateConnectAccountResDto> => {
    const { data, error } = await supabase.functions.invoke(
      'create-connect-account',
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
