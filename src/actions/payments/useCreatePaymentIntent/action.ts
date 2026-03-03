import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CreatePaymentIntentBodyDto, CreatePaymentIntentResDto } from './types';

export const createPaymentIntentAction = async (
  body: CreatePaymentIntentBodyDto,
): Promise<CreatePaymentIntentResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-payment-intent',
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
