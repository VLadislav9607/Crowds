import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CreateConnectAccountLinkResDto } from './types';

export const createConnectAccountLinkAction =
  async (): Promise<CreateConnectAccountLinkResDto> => {
    const { data, error } = await supabase.functions.invoke(
      'create-connect-account-link',
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
