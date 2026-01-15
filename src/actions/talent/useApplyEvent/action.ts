import { supabase } from '@services';
import { ApplyEventBodyDto, ApplyEventResDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const applyEventAction = async (
  body: ApplyEventBodyDto,
): Promise<ApplyEventResDto> => {
  const { data, error } = await supabase.functions.invoke('apply-to-event', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
