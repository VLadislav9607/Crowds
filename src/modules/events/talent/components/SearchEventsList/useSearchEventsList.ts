import { useRef } from 'react';
import { TalentEventUnavailableTimeModalRef } from '../../modals';
import { TalentEventAlreadyBookedModalRef } from '../../modals';
import { TalentEventApplyConfirmModalRef } from '../../modals';
import { useSearchPublicEvents } from '@actions';
import { SearchEventsListProps } from './types';

export const useSearchEventsList = ({ filters }: SearchEventsListProps) => {
  const {
    data: eventsResponse,
    fetchNextPage,
    refetch,
    isRefetching,
    isLoading,
    hasNextPage,
  } = useSearchPublicEvents({ ...filters });

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
    isRefetching,
    hasNextPage,
    refetch,
    fetchNextPage,
  };
};
