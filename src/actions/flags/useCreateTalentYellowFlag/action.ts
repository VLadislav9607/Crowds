import { supabase } from '@services';
import {
  CreateTalentRedFlagBodyDto,
  CreateTalentRedFlagRespDto,
} from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createTalentRedFlagAction = async (
  body: CreateTalentRedFlagBodyDto,
): Promise<CreateTalentRedFlagRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-talent-red-flag',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    console.log('errorMessage', errorMessage);
    throw errorMessage;
  }

  return data;
};
