import { FunctionsHttpError } from '@supabase/supabase-js';
import { CreateKycSdkTokenBodyDto, CreateKycSdkTokenRespDto } from './types';
import { supabase } from '@services';

export const createKycSdkTokenAction = async (
  body: CreateKycSdkTokenBodyDto,
): Promise<CreateKycSdkTokenRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-kyc-sdk-token',
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
