import { useTalentPublicEvents } from '@actions';
import { SearchEventsListProps } from './types';

export const useSearchEventsList = ({ filters }: SearchEventsListProps) => {
  const {
    data: eventsResponse,
    fetchNextPage,
    refetch,
    isLoading,
    hasNextPage,
    error,
  } = useTalentPublicEvents({ ...filters }, { staleTime: 0, gcTime: 0 });

  console.log('error', error);

  const events = eventsResponse?.data && !isLoading ? eventsResponse?.data : [];

  console.log('events', events);

  return {
    isLoading,
    events,
    hasNextPage,
    refetch,
    fetchNextPage,
  };
};
