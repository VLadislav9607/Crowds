import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { getPlatformBalanceAction } from './action';
import { PlatformBalanceDto } from './types';

export const useGetPlatformBalance = (
  options?: IQueryOptions<PlatformBalanceDto>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_PLATFORM_BALANCE],
    queryFn: getPlatformBalanceAction,
    ...options,
  });
};
