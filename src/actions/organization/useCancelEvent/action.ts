import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CancelEventBodyDto, CancelEventResDto } from './types';

export const cancelEventAction = async (
  body: CancelEventBodyDto,
): Promise<CancelEventResDto> => {
  const { data, error } = await supabase.functions.invoke('cancel-event', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
