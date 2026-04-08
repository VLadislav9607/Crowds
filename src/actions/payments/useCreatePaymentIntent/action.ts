import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CreatePaymentIntentBodyDto, CreatePaymentIntentResDto } from './types';

const PROCESSING_RETRY_ATTEMPTS = 5;
const PROCESSING_RETRY_DELAY_MS = 2000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createPaymentIntentAction = async (
  body: CreatePaymentIntentBodyDto,
): Promise<CreatePaymentIntentResDto> => {
  for (let attempt = 0; attempt < PROCESSING_RETRY_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await delay(PROCESSING_RETRY_DELAY_MS);
    }

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

    // PI still processing on Stripe side — keep loader spinning and retry
    if (data?.status === 'payment_processing') {
      if (attempt < PROCESSING_RETRY_ATTEMPTS - 1) continue;
      throw new Error('Payment is still being processed. Please wait a moment and try again.');
    }

    return data;
  }

  throw new Error('Payment processing timeout. Please try again.');
};
