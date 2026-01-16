import { supabase } from '@services';
import { FunctionsHttpError } from '@supabase/supabase-js';
import {
  RejectTalentApplicationBodyDto,
  RejectTalentApplicationResDto,
} from './types';

export const rejectTalentApplicationAction = async (
  body: RejectTalentApplicationBodyDto,
): Promise<RejectTalentApplicationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'reject-talent-application',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
