import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventsTagsAction } from './action';
import { queryClient } from '@services';

export const useGetEventsTags = (subcategoryIds: string[]) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_TAGS, subcategoryIds],
    staleTime: Infinity,
    queryFn: () => getEventsTagsAction(subcategoryIds),
    enabled: subcategoryIds.length > 0,
  });
};

export const prefetchEventsTags = async (subcategoryIds: string[]) => {
  await queryClient.prefetchQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_TAGS, subcategoryIds],
    queryFn: () => getEventsTagsAction(subcategoryIds),
  });
};
