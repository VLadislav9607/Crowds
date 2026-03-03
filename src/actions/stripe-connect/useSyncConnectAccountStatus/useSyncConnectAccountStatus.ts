import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { syncConnectAccountStatusAction } from './action';
import { SyncConnectAccountStatusResDto } from './types';

export const useSyncConnectAccountStatus = (
  options?: IMutationOptions<SyncConnectAccountStatusResDto>,
) => {
  return useMutation({
    mutationFn: syncConnectAccountStatusAction,
    onSuccess: data => {
      queryClient.setQueryData([TANSTACK_QUERY_KEYS.GET_CONNECT_ACCOUNT], data);
      options?.onSuccess?.(data, undefined as any, undefined as any);
    },
  });
};
