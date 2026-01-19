import { useRef, useState } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import { AppFlashList } from '@components';
import {
  useAcceptProposal,
  useCancelApplication,
  useDeclineProposal,
} from '@actions';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showSuccessToast, showErrorToast } from '@helpers';
import {
  TalentEventAlreadyBookedModal,
  TalentEventUnavailableTimeModal,
  TalentEventApplyConfirmModal,
  TalentEventUnavailableTimeModalRef,
  TalentEventAlreadyBookedModalRef,
  TalentEventApplyConfirmModalRef,
} from '../../modals';
import { TalentEventsListProps } from './types';
import { TalentEventCard } from '../TalentEventCard';
import { styles } from './styles';

export const TalentEventsList = ({
  type,
  data = [],
  isLoading = false,
  isRefetching = false,
  hasMoreItems = false,
  onRefresh,
  onLoadMore,
  ...props
}: TalentEventsListProps) => {
  const [cancellationId, setCancellationId] = useState<string | null>(null);

  const unavailableTimeModalRef =
    useRef<TalentEventUnavailableTimeModalRef>(null);
  const alreadyBookedModalRef = useRef<TalentEventAlreadyBookedModalRef>(null);
  const applyConfirmModalRef = useRef<TalentEventApplyConfirmModalRef>(null);

  const acceptProposal = useAcceptProposal({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
      ]);
      showSuccessToast('Proposal accepted successfully');
      applyConfirmModalRef.current?.handleSuccess();
      onRefresh?.();
    },
    onError: (error: any) => {
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
      ]);
      showSuccessToast('Proposal declined successfully');
      onRefresh?.();
    },
    onError: (error: any) => {
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
      ]);
      showSuccessToast('Application canceled successfully');
      onRefresh?.();
      setCancellationId(null);
    },
    onError: (error: any) => {
      showErrorToast(error?.message || 'Failed to cancel application');
      setCancellationId(null);
    },
  });

  const handleAccept = (event: any) => {
    applyConfirmModalRef.current?.open({
      eventTitle: event.event_title,
      formattedAddress: event.formatted_address,
      startAt: event.start_at,
      endAt: event.end_at,
      onConfirm: () => {
        acceptProposal.mutate({ participationId: event.participation_id });
      },
    });
  };


  const handleDecline = (participationId: string) => {
    declineProposal.mutate({ participationId });
  };

  const handleCancelApplication = (participationId: string) => {
    setCancellationId(participationId);
    cancelApplication.mutate({ participationId });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TalentEventCard
      event={item}
      containerStyle={styles.itemContainer}
      type={type}
      isLoadingCancellation={cancellationId === item.participation_id}
      isLoadingAccept={acceptProposal.isPending}
      isLoadingDecline={declineProposal.isPending}
      onPressAccept={handleAccept}
      onPressDecline={handleDecline}
      onCancelApplication={handleCancelApplication}
    />
  );

  const ListSkeletonComponent = (
    <View style={styles.skeletonListContainer}>
      <SkeletonPlaceholder>
        <View style={styles.skeletonItemsContainer}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={176}
            borderRadius={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={176}
            borderRadius={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={176}
            borderRadius={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={176}
            borderRadius={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={176}
            borderRadius={10}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );

  const skeletonEvents = isLoading ? ListSkeletonComponent : undefined;

  return (
    <>
      <AppFlashList
        data={data}
        emptyText="No events found"
        renderItem={renderItem}
        withBottomTab
        onRefresh={onRefresh}
        refreshing={isRefetching}
        keyExtractor={item => item.event_id}
        gap={9}
        skeleton={skeletonEvents}
        showBottomLoader={hasMoreItems && !isLoading}
        onEndReached={hasMoreItems && !isLoading ? onLoadMore : undefined}
        onEndReachedThreshold={0.5}
        {...props}
      />

      <TalentEventUnavailableTimeModal ref={unavailableTimeModalRef} />
      <TalentEventAlreadyBookedModal ref={alreadyBookedModalRef} />
      <TalentEventApplyConfirmModal ref={applyConfirmModalRef} />
    </>
  );
};
