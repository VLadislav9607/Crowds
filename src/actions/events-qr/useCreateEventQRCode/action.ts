import { supabase } from '@services';
import { CreateEventQRCodeBodyDto, CreateEventQRCodeResDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createEventQRCodeAction = async (
  body: CreateEventQRCodeBodyDto,
): Promise<CreateEventQRCodeResDto> => {
  const { error } = await supabase.functions.invoke('generate-event-qr-png', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return { success: true };
};
