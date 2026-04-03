import { supabase } from '@services';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const deleteTalentAccountAction = async (): Promise<void> => {
  const { error } = await supabase.functions.invoke('delete-talent-account');

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  if (error) throw error;
};
