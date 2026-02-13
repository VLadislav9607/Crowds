import { supabase } from '@services';
import {
  ActiveFlagRow,
  GetActiveFlagForTargetParams,
  GetActiveFlagForTargetRespDto,
} from './types';

export const getActiveFlagForTargetAction = async ({
  targetType,
  targetId,
}: GetActiveFlagForTargetParams): Promise<GetActiveFlagForTargetRespDto> => {
  const { data, error } = await supabase.rpc('get_active_flag_for_target', {
    target_type_input: targetType,
    target_id_input: targetId,
  });

  if (error) {
    throw error;
  }

  const rows = (data as ActiveFlagRow[]) ?? [];
  return rows.length > 0 ? rows[0] : null;
};
