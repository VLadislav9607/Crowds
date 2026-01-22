import { TANSTACK_QUERY_KEYS } from '@constants';
import { EventFolder, UseGetEventsFoldersBodyDto } from './types';
import { useQuery } from '@tanstack/react-query';
import { getEventsFoldersAction } from './action';
import { IQueryOptions } from '@services';

export const useGetEventsFolders = (
  body: UseGetEventsFoldersBodyDto,
  options?: IQueryOptions<EventFolder[]>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_FOLDERS, JSON.stringify(body)],
    queryFn: async () => await getEventsFoldersAction(body),
    ...options,
  });
};
