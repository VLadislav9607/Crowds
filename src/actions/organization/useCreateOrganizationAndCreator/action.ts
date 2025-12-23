import { FunctionsHttpError } from '@supabase/supabase-js';
import { CreateOrganizationBodyDto, CreateOrganizationResDto } from './types';
import { supabase } from '@services';

export const createOrganizationAndCreatorAction = async (
  body: CreateOrganizationBodyDto,
): Promise<CreateOrganizationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-organization',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as CreateOrganizationResDto;
};
