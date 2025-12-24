import { FunctionsHttpError } from '@supabase/supabase-js';
import { CreateKycSessionBodyDto, CreateKycSessionRespDto } from './types';
import { supabase } from '@services';

export const createKycSessionAction = async (
  body: CreateKycSessionBodyDto,
): Promise<CreateKycSessionRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-kyc-session',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;

  // const response = await fetch(
  //   'http://127.0.0.1:54321/functions/v1/create-kyc-session',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify(body),
  //   },
  // );

  // console.log('response', response);

  // if (!response.ok) {
  //   throw new Error('Failed to create KYC session');
  // }

  // return response.json();
};
