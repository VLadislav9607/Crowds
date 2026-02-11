import { FunctionsHttpError } from '@supabase/supabase-js';
import { CreateLocalOrgResDto, CreateLocalOrgBodyDto } from './types';
import { supabase } from '@services';

export const createLocalOrgAction = async (
  body: CreateLocalOrgBodyDto,
): Promise<CreateLocalOrgResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-locale-organization',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as CreateLocalOrgResDto;
};
