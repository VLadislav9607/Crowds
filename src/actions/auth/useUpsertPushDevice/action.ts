import { supabase } from '@services';
import type { UpsertPushDeviceParams } from './types';

export async function upsertPushDeviceAction(
  params: UpsertPushDeviceParams,
): Promise<void> {
  const { error } = await supabase.rpc('upsert_push_device', {
    p_device_id: params.deviceId,
    p_platform: params.platform,
    p_fcm_token: params.fcmToken,
  });

  if (error) {
    throw error;
  }
}
