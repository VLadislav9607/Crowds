import { useRef } from 'react';
import { TalentEventUnavailableTimeModalRef } from '../../modals';
import { TalentEventAlreadyBookedModalRef } from '../../modals';
import { TalentEventApplyConfirmModalRef } from '../../modals';
import { useSearchPublicEvents } from '@actions';
import { SearchEventsListProps } from './types';
import { useRefetchQuery } from '@hooks';

export const useSearchEventsList = ({ filters }: SearchEventsListProps) => {
  const {
    data: eventsResponse,
    fetchNextPage,
    refetch,
    isLoading,
    hasNextPage,
    error,
  } = useSearchPublicEvents({ ...filters }, { staleTime: 0, gcTime: 0 });

  console.log('eventsResponse', eventsResponse);
  console.log('error', error);

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const events = eventsResponse?.data && !isLoading ? eventsResponse?.data : [];

  const unavailableTimeModalRef =
    useRef<TalentEventUnavailableTimeModalRef>(null);
  const alreadyBookedModalRef = useRef<TalentEventAlreadyBookedModalRef>(null);
  const applyConfirmModalRef = useRef<TalentEventApplyConfirmModalRef>(null);

  return {
    unavailableTimeModalRef,
    alreadyBookedModalRef,
    applyConfirmModalRef,
    isLoading,
    events,
    isRefetchingQuery,
    hasNextPage,
    refetchQuery,
    fetchNextPage,
  };
};
