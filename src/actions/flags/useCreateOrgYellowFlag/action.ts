import { supabase } from '@services';
import {
  CreateOrgYellowFlagBodyDto,
  CreateOrgYellowFlagRespDto,
} from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createOrgYellowFlagAction = async (
  body: CreateOrgYellowFlagBodyDto,
): Promise<CreateOrgYellowFlagRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-org-yellow-flag',
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
