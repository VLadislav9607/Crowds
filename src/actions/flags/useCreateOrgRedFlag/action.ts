import { supabase } from '@services';
import {
  CreateOrgRedFlagBodyDto,
  CreateOrgRedFlagRespDto,
} from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createOrgRedFlagAction = async (
  body: CreateOrgRedFlagBodyDto,
): Promise<CreateOrgRedFlagRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-org-red-flag',
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
