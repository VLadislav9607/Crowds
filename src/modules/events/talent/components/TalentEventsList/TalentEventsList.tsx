import { useRef } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import { AppFlashList } from '@components';
import { useAcceptProposal, useDeclineProposal } from '@actions';
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
import { TalentEventCardCompact } from '../TalentEventCardCompact';
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
  const unavailableTimeModalRef =
    useRef<TalentEventUnavailableTimeModalRef>(null);
  const alreadyBookedModalRef = useRef<TalentEventAlreadyBookedModalRef>(null);
  const applyConfirmModalRef = useRef<TalentEventApplyConfirmModalRef>(null);

  const acceptProposal = useAcceptProposal({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_PROPOSALS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
      ]);
      showSuccessToast('Proposal accepted successfully');
      onRefresh?.();
    },
    onError: (error: any) => {
      showErrorToast(error?.message || 'Failed to accept proposal');
    },
  });

  const declineProposal = useDeclineProposal({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_PROPOSALS],
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

  const handleAccept = (participationId: string) => {
    acceptProposal.mutate({ participationId });
  };

  const handleDecline = (participationId: string) => {
    declineProposal.mutate({ participationId });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TalentEventCardCompact
      event={item}
      containerStyle={styles.itemContainer}
      type={type}
      onPressAccept={type === 'proposed' ? handleAccept : undefined}
      onPressDecline={type === 'proposed' ? handleDecline : undefined}
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
        onRefresh={onRefresh}
        refreshing={isRefetching}
        keyExtractor={item => item.eventId}
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
