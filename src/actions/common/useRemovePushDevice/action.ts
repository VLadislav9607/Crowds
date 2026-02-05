import { supabase } from '@services';
import { getDeviceId } from '@services';

/**
 * Remove current device from push_devices (call before logout so user stops receiving pushes).
 */
export async function removePushDevice(): Promise<void> {
  const deviceId = await getDeviceId();

  const { error } = await supabase.rpc('remove_push_device', {
    p_device_id: deviceId,
  });

  if (error) {
    console.warn('[Push] remove device failed', error);
  }
}
