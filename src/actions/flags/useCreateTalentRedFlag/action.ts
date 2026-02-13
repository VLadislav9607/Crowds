import { supabase } from '@services';
import {
  CreateTalentYellowFlagBodyDto,
  CreateTalentYellowFlagRespDto,
} from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createTalentYellowFlagAction = async (
  body: CreateTalentYellowFlagBodyDto,
): Promise<CreateTalentYellowFlagRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-talent-yellow-flag',
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
