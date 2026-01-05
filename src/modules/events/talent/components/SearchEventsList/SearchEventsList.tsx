import { ActivityIndicator, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SearchEventsListProps } from './types';
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
import { useSearchEventsList } from './useSearchEventsList';
import { SearchPublicEventsListItemDto } from '@actions';

export const SearchEventsList = ({ ...props }: SearchEventsListProps) => {
  const {
    unavailableTimeModalRef,
    alreadyBookedModalRef,
    applyConfirmModalRef,
    events,
    hasNextPage,
    isLoading,
    isRefetching,
    fetchNextPage,
    refetch,
  } = useSearchEventsList(props);

  const renderItem = ({ item }: { item: SearchPublicEventsListItemDto }) => (
    <TalentEventCardCompact
      event={item}
      containerStyle={styles.itemContainer}
    />
  );

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const ListFooterLoader = (
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
        </View>
      </SkeletonPlaceholder>
    </View>
  );

  const ListNoEventsComponent = (
    <View style={styles.noEventsContainer}>
      <AppText typography="medium_14" color="gray">
        No events found
      </AppText>
    </View>
  );

  const ListEmptyComponent = isLoading
    ? ListSkeletonComponent
    : ListNoEventsComponent;

  return (
    <>
      <FlashList
        refreshing={isRefetching}
        onRefresh={refetch}
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={hasNextPage ? ListFooterLoader : null}
        onEndReached={hasNextPage ? fetchNextPage : null}
        {...props}
      />

      <TalentEventUnavailableTimeModal ref={unavailableTimeModalRef} />

      <TalentEventAlreadyBookedModal ref={alreadyBookedModalRef} />

      <TalentEventApplyConfirmModal ref={applyConfirmModalRef} />
    </>
  );
};
