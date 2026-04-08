import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  ConfirmEventPublicationBodyDto,
  ConfirmEventPublicationResDto,
} from './types';

const PAYMENT_RETRY_ATTEMPTS = 3;
const PAYMENT_RETRY_DELAY_MS = 2000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const confirmEventPublicationAction = async (
  body: ConfirmEventPublicationBodyDto,
): Promise<ConfirmEventPublicationResDto> => {
  let lastError: unknown;

  for (let attempt = 0; attempt < PAYMENT_RETRY_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await delay(PAYMENT_RETRY_DELAY_MS);
    }

    const { data, error } = await supabase.functions.invoke(
      'confirm-event-publication',
      { body },
    );

    if (error && error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      // Only retry if Stripe hasn't confirmed yet
      if (errorMessage?.error === 'Payment not completed') {
        lastError = errorMessage;
        continue;
      }
      throw errorMessage;
    }

    if (error) {
      throw error;
    }

    return data;
  }

  throw lastError;
};
