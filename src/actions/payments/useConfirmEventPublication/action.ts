import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  ConfirmEventPublicationBodyDto,
  ConfirmEventPublicationResDto,
} from './types';

export const confirmEventPublicationAction = async (
  body: ConfirmEventPublicationBodyDto,
): Promise<ConfirmEventPublicationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'confirm-event-publication',
    { body },
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
