import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CancelApplicationBodyDto, CancelApplicationResDto } from './types';

export const cancelApplicationAction = async (
  body: CancelApplicationBodyDto,
): Promise<CancelApplicationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'cancel-application',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
