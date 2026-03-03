import { useEffect, useCallback } from 'react';
import { realtimeService, supabase, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useConnectAccountSubscription = (enabled = true) => {
  const subscribe = useCallback(async () => {
    if (!enabled) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const channelName = `connect_account_${user.id}`;

    realtimeService.subscribe({
      channelName,
      table: 'stripe_connect_accounts',
      event: 'UPDATE',
      filter: `talent_id=eq.${user.id}`,
      onPayload: () => {
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_CONNECT_ACCOUNT],
        });
      },
    });
  }, [enabled]);

  const unsubscribe = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      realtimeService.unsubscribe(`connect_account_${user.id}`);
    }
  }, []);

  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);
};
