import { useRef } from 'react';
import { TalentEventUnavailableTimeModalRef } from '../../modals';
import { TalentEventAlreadyBookedModalRef } from '../../modals';
import { TalentEventApplyConfirmModalRef } from '../../modals';
import { useSearchPublicEvents } from '@actions';

export const useTalentEventsList = () => {
  const { refetch, isRefetching, isLoading } = useSearchPublicEvents({});

  const unavailableTimeModalRef =
    useRef<TalentEventUnavailableTimeModalRef>(null);
  const alreadyBookedModalRef = useRef<TalentEventAlreadyBookedModalRef>(null);
  const applyConfirmModalRef = useRef<TalentEventApplyConfirmModalRef>(null);

  const hasMoreItems = false;

  return {
    unavailableTimeModalRef,
    alreadyBookedModalRef,
    applyConfirmModalRef,
    hasMoreItems,
    isLoading,
    isRefetching,
    refetch,
  };
};
