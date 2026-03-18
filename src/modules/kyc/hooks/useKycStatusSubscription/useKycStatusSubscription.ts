import { useEffect, useCallback, useRef } from 'react';
import { realtimeService } from '@services';
import { KycRecord, UseKycStatusSubscriptionProps } from './types';
import { KycStatus } from '@modules/kyc';

export const useKycStatusSubscription = ({
  userId,
  onStatusChange,
  enabled = true,
}: UseKycStatusSubscriptionProps) => {
  const channelName = `kyc_status_${userId}`;

  // Stable ref so the subscription callback never goes stale
  const onStatusChangeRef = useRef(onStatusChange);
  onStatusChangeRef.current = onStatusChange;

  const subscribe = useCallback(() => {
    if (!userId || !enabled) return;

    realtimeService.subscribe<KycRecord>({
      channelName,
      table: 'user_kyc',
      event: 'UPDATE',
      filter: `user_id=eq.${userId}`,
      onPayload: payload => {
        console.log('payload', payload);
        if (payload.new && 'status' in payload.new) {
          onStatusChangeRef.current({
            status: payload.new.status as KycStatus,
            checksTotal: (payload.new as KycRecord).checks_total ?? 0,
            checksPassed: (payload.new as KycRecord).checks_passed ?? 0,
          });
        }
      },
    });
  }, [userId, enabled, channelName]);

  const unsubscribe = useCallback(() => {
    realtimeService.unsubscribe(channelName);
  }, [channelName]);

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, [subscribe, unsubscribe]);

  return { unsubscribe };
};
