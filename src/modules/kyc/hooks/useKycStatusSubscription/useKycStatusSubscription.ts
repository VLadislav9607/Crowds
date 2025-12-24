import { useEffect, useCallback } from 'react';
import { realtimeService } from '@services';
import { KycRecord, UseKycStatusSubscriptionProps } from './types';
import { KycStatus } from '@modules/kyc';

export const useKycStatusSubscription = ({
  userId,
  onStatusChange,
  enabled = true,
}: UseKycStatusSubscriptionProps) => {
  const channelName = `kyc_status_${userId}`;

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
          onStatusChange(payload.new.status as KycStatus);
        }
      },
    });
  }, [userId, enabled, channelName, onStatusChange]);

  const unsubscribe = useCallback(() => {
    realtimeService.unsubscribe(channelName);
  }, [channelName]);

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, [subscribe, unsubscribe]);

  return { unsubscribe };
};
