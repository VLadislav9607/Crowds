import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useApplyEvent, useHideEvent, ITalentEventCard } from '@actions';
import { AppFlashList } from '@components';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showSuccessToast, showErrorToast } from '@helpers';

import { SearchEventsListProps } from './types';
import { styles } from './styles';
import { TalentEventCard } from '../TalentEventCard';
import {
  TalentEventAlreadyBookedModal,
  TalentEventUnavailableTimeModal,
  TalentEventApplyConfirmModal,
} from '../../modals';
import { useSearchEventsList } from './useSearchEventsList';

export const SearchEventsList = ({ ...props }: SearchEventsListProps) => {
  const {
    unavailableTimeModalRef,
    alreadyBookedModalRef,
    applyConfirmModalRef,
    events,
    hasNextPage,
    isLoading,
    isRefetchingQuery,
    fetchNextPage,
    refetchQuery,
  } = useSearchEventsList(props);

  const applyEvent = useApplyEvent({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
        }),
      ]);
      showSuccessToast('Application submitted successfully');
      applyConfirmModalRef.current?.handleSuccess();
    },
    onError: (error: any) => {
      showErrorToast(error?.message || 'Failed to submit application');
      applyConfirmModalRef.current?.handleError();
    },
  });

  const hideEvent = useHideEvent({
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS],
        }),
      ]);
      showSuccessToast('Event rejected successfully');
    },
    onError: (error: any) => {
      showErrorToast(error?.message || 'Failed to hide event');
    },
  });

  const handleApply = (event: ITalentEventCard) => {
    applyConfirmModalRef.current?.open({
      eventTitle: event.event_title,
      formattedAddress: event?.formatted_address || '',
      startAt: event.start_at || '',
      endAt: event.end_at || '',
      onConfirm: () => applyEvent.mutate({ eventId: event.event_id }),
    });
  };

  const handleReject = (eventId: string) => {
    hideEvent.mutate({ eventId });
  };

  const renderItem = ({ item }: { item: ITalentEventCard }) => (
    <TalentEventCard
      event={item}
      containerStyle={styles.itemContainer}
      isLoadingApply={applyEvent.isPending}
      isLoadingReject={hideEvent.isPending}
      onPressApply={() => handleApply(item)}
      onPressReject={handleReject}
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
        </View>
      </SkeletonPlaceholder>
    </View>
  );

  return (
    <>
      <AppFlashList
        refreshing={isRefetchingQuery}
        onRefresh={refetchQuery}
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.event_id}
        gap={9}
        emptyText="No events found"
        skeleton={isLoading ? ListSkeletonComponent : undefined}
        showBottomLoader={hasNextPage}
        onEndReached={hasNextPage ? fetchNextPage : null}
        {...props}
      />

      <TalentEventUnavailableTimeModal ref={unavailableTimeModalRef} />

      <TalentEventAlreadyBookedModal ref={alreadyBookedModalRef} />

      <TalentEventApplyConfirmModal ref={applyConfirmModalRef} />
    </>
  );
};
