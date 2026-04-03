import { supabase } from '@services';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const restoreAccountAction = async (): Promise<void> => {
  const { error } = await supabase.functions.invoke('restore-account');

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  if (error) throw error;
};
