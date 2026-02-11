import { FunctionsHttpError } from '@supabase/supabase-js';
import { CreateGlobalOrgResDto, CreateGlobalOrgBodyDto } from './types';
import { supabase } from '@services';

export const createGlobalOrgAction = async (
  body: CreateGlobalOrgBodyDto,
): Promise<CreateGlobalOrgResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-global-organization',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as CreateGlobalOrgResDto;
};
