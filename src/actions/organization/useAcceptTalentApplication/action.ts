import { supabase } from '@services';
import { FunctionsHttpError } from '@supabase/supabase-js';
import {
  AcceptTalentApplicationBodyDto,
  AcceptTalentApplicationResDto,
} from './types';

export const acceptTalentApplicationAction = async (
  body: AcceptTalentApplicationBodyDto,
): Promise<AcceptTalentApplicationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'accept-talent-application',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    let errorMessage: any;
    try {
      errorMessage = await error.context.json();
    } catch {
      throw { message: 'Failed to accept application' };
    }
    throw errorMessage;
  }

  return data;
};
