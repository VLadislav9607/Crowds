import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { getCustomListsAction } from './action';
import { CustomListDto } from './types';

export const useGetCustomLists = (options?: IQueryOptions<CustomListDto[]>) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS],
    queryFn: getCustomListsAction,
    ...options,
  });
};
