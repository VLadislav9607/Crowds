import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventsCategoriesAction } from './action';
import { queryClient } from '@services';

export const useGetEventsCategories = () => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_CATEGORIES],
    staleTime: Infinity,
    queryFn: getEventsCategoriesAction,
  });
};

export const prefetchEventsCategories = async () => {
  await queryClient.prefetchQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_CATEGORIES],
    queryFn: getEventsCategoriesAction,
  });
};
