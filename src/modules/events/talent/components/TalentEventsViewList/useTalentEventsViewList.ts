import { useRef } from 'react';
import {
  TalentEventAlreadyBookedModalRef,
  TalentEventApplyConfirmModalRef,
  TalentEventUnavailableTimeModalRef,
} from '../../modals';
import {
  useAcceptProposal,
  useApplyEvent,
  useCancelApplication,
  useDeclineProposal,
  useHideEvent,
  useRemoveEventFromEventsFolder,
} from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { showErrorToast, showSuccessToast } from '@helpers';
import { TalentEventsViewListProps } from './types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AddEventToForderModalData } from 'src/modules/events-folders';
import { ITalentEventCard } from '../TalentEventCard/types';

export const useTalentEventsViewList = ({
  refetch,
}: TalentEventsViewListProps) => {
  const unavailableTimeModalRef =
    useRef<TalentEventUnavailableTimeModalRef>(null);
  const alreadyBookedModalRef = useRef<TalentEventAlreadyBookedModalRef>(null);
  const applyConfirmModalRef = useRef<TalentEventApplyConfirmModalRef>(null);
  const addEventToForderModalRef =
    useRef<BottomSheetModal<AddEventToForderModalData> | null>(null);

  const removeEventFromEventsFolder = useRemoveEventFromEventsFolder({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS],
        }),
        queryClient.refetchQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_FOLDERS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER],
        }),
      ]);
      await refetch?.();
      showSuccessToast('Event removed from folder successfully');
    },
    onError: error => {
      showErrorToast(error?.message || 'Failed to remove event from folder');
    },
  });

  const hideEvent = useHideEvent({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS],
        }),
      ]);
      await refetch?.();
      showSuccessToast('Event rejected successfully');
    },
    onError: error => {
      showErrorToast(error?.message || 'Failed to hide event');
    },
  });

  const applyEvent = useApplyEvent({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER],
        }),
      ]);
      await refetch?.();
      showSuccessToast('Application submitted successfully');
      applyConfirmModalRef.current?.handleSuccess();
    },
    onError: error => {
      showErrorToast(error?.message || 'Failed to submit application');
      applyConfirmModalRef.current?.handleError();
    },
  });

  const acceptProposal = useAcceptProposal({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER],
        }),
      ]);
      await refetch?.();
      showSuccessToast('Proposal accepted successfully');
      applyConfirmModalRef.current?.handleSuccess();
    },
    onError: error => {
      showErrorToast(error?.message || 'Failed to accept proposal');
      applyConfirmModalRef.current?.handleError();
    },
  });

  const declineProposal = useDeclineProposal({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER],
        }),
      ]);
      await refetch?.();
      showSuccessToast('Proposal declined successfully');
    },
    onError: error => {
      showErrorToast(error?.message || 'Failed to decline proposal');
    },
  });

  const cancelApplication = useCancelApplication({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER],
        }),
      ]);
      await refetch?.();
      showSuccessToast('Application canceled successfully');
    },
    onError: error => {
      showErrorToast(error?.message || 'Failed to cancel application');
    },
  });

  const handleAccept = async (event: ITalentEventCard) => {
    applyConfirmModalRef.current?.open({
      eventTitle: event.title,
      formattedAddress: event?.location?.formatted_address
        ? event?.location?.formatted_address
        : event?.location?.city && event?.location?.country
        ? `${event?.location?.city}, ${event?.location?.country}`
        : '',
      startAt: event.start_at,
      endAt: event.end_at,
      onConfirm: () => {
        acceptProposal.mutate({
          participationId: event.participant?.id!,
        });
      },
    });
  };

  const handleDecline = async (participationId: string) => {
    await declineProposal.mutateAsync({ participationId });
  };

  const handleCancelApplication = async (participationId: string) => {
    await cancelApplication.mutateAsync({ participationId });
  };

  const handleApply = async (event: ITalentEventCard) => {
    applyConfirmModalRef.current?.open({
      eventTitle: event.title,
      formattedAddress: event?.location?.formatted_address
        ? event?.location?.formatted_address
        : event?.location?.city && event?.location?.country
        ? `${event?.location?.city}, ${event?.location?.country}`
        : '',
      startAt: event.start_at || '',
      endAt: event.end_at || '',
      onConfirm: () => applyEvent.mutate({ eventId: event.event_id }),
    });
  };

  const handleReject = async (eventId: string) => {
    await hideEvent.mutateAsync({ eventId });
  };

  const handleRemoveEventFromFolder = async (
    eventId: string,
    folderId: string,
  ) => {
    await removeEventFromEventsFolder.mutateAsync({
      folder_id: folderId,
      event_id: eventId,
    });
  };

  return {
    addEventToForderModalRef,
    unavailableTimeModalRef,
    alreadyBookedModalRef,
    applyConfirmModalRef,
    acceptProposal,
    declineProposal,
    handleRemoveEventFromFolder,
    handleAccept,
    handleDecline,
    handleCancelApplication,
    handleApply,
    handleReject,
  };
};
