import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';

interface CreateKycChecksParams {
  clientId: string;
  documentId?: string;
  livePhotoId?: string;
}

export const createKycChecksAction = async (params: CreateKycChecksParams) => {
  const { data, error } = await supabase.functions.invoke('create-kyc-checks', {
    body: params,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
