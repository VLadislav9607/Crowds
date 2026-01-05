import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getEventsSubCategoriesAction } from './action';
import { queryClient } from '@services';

export const useGetEventsSubCategories = (categoryIds: string[]) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_SUB_CATEGORIES, categoryIds],
    staleTime: Infinity,
    queryFn: () => getEventsSubCategoriesAction(categoryIds),
    enabled: categoryIds.length > 0,
  });
};

export const prefetchEventsSubCategories = async (categoryIds: string[]) => {
  await queryClient.prefetchQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_SUB_CATEGORIES, categoryIds],
    queryFn: () => getEventsSubCategoriesAction(categoryIds),
  });
};
