import { useRef } from 'react';
import { TalentEventUnavailableTimeModalRef } from '../../modals';
import { TalentEventAlreadyBookedModalRef } from '../../modals';
import { TalentEventApplyConfirmModalRef } from '../../modals';
import { useTalentPublicEvents } from '@actions';
import { SearchEventsListProps } from './types';
import { useRefetchQuery } from '@hooks';

export const useSearchEventsList = ({ filters }: SearchEventsListProps) => {
  const {
    data: eventsResponse,
    fetchNextPage,
    refetch,
    isLoading,
    hasNextPage,
  } = useTalentPublicEvents({ ...filters }, { staleTime: 0, gcTime: 0 });

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
