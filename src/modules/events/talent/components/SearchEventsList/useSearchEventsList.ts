import { useTalentPublicEvents } from '@actions';
import { SearchEventsListProps } from './types';

export const useSearchEventsList = ({ filters }: SearchEventsListProps) => {
  const {
    data: eventsResponse,
    fetchNextPage,
    refetch,
    isLoading,
    hasNextPage,
  } = useTalentPublicEvents({ ...filters }, { staleTime: 0, gcTime: 0 });

  const events = eventsResponse?.data && !isLoading ? eventsResponse?.data : [];

  return {
    isLoading,
    events,
    hasNextPage,
    refetch,
    fetchNextPage,
  };
};
