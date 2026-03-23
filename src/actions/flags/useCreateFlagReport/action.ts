import { supabase } from '@services';
import {
  CreateFlagReportBodyDto,
  CreateFlagReportRespDto,
} from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createFlagReportAction = async (
  body: CreateFlagReportBodyDto,
): Promise<CreateFlagReportRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-flag-report',
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
