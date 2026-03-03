import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { getConnectAccountAction } from './action';
import { ConnectAccountDto } from './types';

export const useGetConnectAccount = (
  options?: IQueryOptions<ConnectAccountDto | null>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_CONNECT_ACCOUNT],
    queryFn: getConnectAccountAction,
    ...options,
  });
};
