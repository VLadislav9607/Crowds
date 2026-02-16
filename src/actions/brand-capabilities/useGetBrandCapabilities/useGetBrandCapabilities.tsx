import { TANSTACK_QUERY_KEYS } from '@constants';
import { getBrandCapabilitiesAction } from './action';
import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { UseGetBrandCapabilitiesResDto } from './types';

export const useGetBrandCapabilities = (
  options?: IQueryOptions<UseGetBrandCapabilitiesResDto>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_BRAND_CAPABILITIES],
    queryFn: getBrandCapabilitiesAction,
    ...options,
  });
};
