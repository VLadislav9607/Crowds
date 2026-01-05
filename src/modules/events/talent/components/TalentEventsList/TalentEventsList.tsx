import { ActivityIndicator, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { TalentEventsListProps } from './types';
import { TalentEventCardCompact } from '../TalentEventCardCompact';
import { COLORS } from '@styles';
import { AppText } from '@ui';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { styles } from './styles';
import {
  TalentEventAlreadyBookedModal,
  TalentEventUnavailableTimeModal,
  TalentEventApplyConfirmModal,
} from '../../modals';
import { useTalentEventsList } from './useTalentEventsList';

export const TalentEventsList = ({ ...props }: TalentEventsListProps) => {
  const {
    unavailableTimeModalRef,
    alreadyBookedModalRef,
    applyConfirmModalRef,
    hasMoreItems,
    isLoading,
    refetch,
    isRefetching,
  } = useTalentEventsList();

  const renderItem = () => (
    <TalentEventCardCompact containerStyle={styles.itemContainer} />
  );
  const renderItemSeparator = () => <View style={styles.itemSeparator} />;
  const renderFooterLoader = () => (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color={COLORS.black} />
    </View>
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

  const ListNoEventsComponent = (
    <AppText typography="medium_14" color="gray">
      No events found
    </AppText>
  );
  const ListEmptyComponent = isLoading
    ? ListSkeletonComponent
    : ListNoEventsComponent;

  return (
    <>
      <FlashList
        refreshing={isRefetching}
        onRefresh={refetch}
        data={isLoading ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        ItemSeparatorComponent={renderItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={() =>
          hasMoreItems && !isLoading ? renderFooterLoader() : null
        }
        {...props}
      />

      {/* <AppFlashList
        data={events}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={isRefetching}
        onRefresh={refetch}
        contentContainerStyle={{ paddingTop: 20 }}
      /> */}

      <TalentEventUnavailableTimeModal ref={unavailableTimeModalRef} />

      <TalentEventAlreadyBookedModal ref={alreadyBookedModalRef} />

      <TalentEventApplyConfirmModal ref={applyConfirmModalRef} />
    </>
  );
};
