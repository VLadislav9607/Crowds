import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';
import { AppFlashList } from '@components';
import {
  TalentEventAlreadyBookedModal,
  TalentEventUnavailableTimeModal,
  TalentEventApplyConfirmModal,
} from '../../modals';
import { TalentEventsViewListProps } from './types';
import { TalentEventCard, ITalentEventCard } from '../TalentEventCard';
import { styles } from './styles';
import { useTalentEventsViewList } from './useTalentEventsViewList';
import { useRefetchQuery } from '@hooks';
import { AddEventToForderModal } from '../../../../events-folders';
import { useGetMe } from '@actions';

export const TalentEventsViewList = ({
  data = [],
  isLoading = false,
  hasMoreItems = false,
  withBottomTab = false,
  refetch,
  onLoadMore,
  cardProps,
  ...props
}: TalentEventsViewListProps) => {
  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const { me } = useGetMe();

  console.log('me', me);

  const {
    unavailableTimeModalRef,
    alreadyBookedModalRef,
    applyConfirmModalRef,
    addEventToForderModalRef,
    handleAccept,
    handleDecline,
    handleCancelApplication,
    handleApply,
    handleReject,
    handleRemoveEventFromFolder,
  } = useTalentEventsViewList({ refetch });

  const renderItem = ({ item }: { item: ITalentEventCard }) => (
    <TalentEventCard
      addEventToForderModalRef={addEventToForderModalRef}
      event={item}
      containerStyle={styles.itemContainer}
      onReject={handleReject}
      onApply={handleApply}
      onAccept={handleAccept}
      onDecline={handleDecline}
      onCancelApplication={handleCancelApplication}
      onRemoveEventFromFolder={handleRemoveEventFromFolder}
      {...cardProps}
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
        extraData={data.length}
        emptyText="No events found"
        renderItem={renderItem}
        withBottomTab={withBottomTab}
        onRefresh={refetchQuery}
        refreshing={isRefetchingQuery}
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
      <AddEventToForderModal bottomSheetRef={addEventToForderModalRef} />
    </>
  );
};
