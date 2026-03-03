import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CreateConnectLoginLinkResDto } from './types';

export const createConnectLoginLinkAction =
  async (): Promise<CreateConnectLoginLinkResDto> => {
    const { data, error } = await supabase.functions.invoke(
      'create-connect-login-link',
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
