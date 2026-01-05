import { AppFlashList } from '@components';
import { OrganizationEventCard } from '../../ui';
import { OrgEventListItemDto, useGetOrgEvents } from '@actions';
import { AppText } from '@ui';
import { StyleSheet, View } from 'react-native';
import { IOrganizationEventsListProps } from './types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const OrganizationEventsList = ({
  filters,
}: IOrganizationEventsListProps) => {
  const {
    data: eventsResponse,
    isLoading,
    isRefetching,
    refetch,
    hasNextPage,
  } = useGetOrgEvents(filters);

  const renderEventCard = ({ item }: { item: OrgEventListItemDto }) => (
    <OrganizationEventCard event={item} />
  );

  const events = eventsResponse?.data && !isLoading ? eventsResponse?.data : [];

  const ListSkeletonComponent = (
    <View style={styles.skeletonListContainer}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={150}
          borderRadius={10}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={150}
          borderRadius={10}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={150}
          borderRadius={10}
          marginBottom={10}
        />
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
    <AppFlashList
      data={events}
      keyExtractor={item => item.id}
      renderItem={renderEventCard}
      gap={4}
      withBottomTab
      ListEmptyComponent={ListEmptyComponent}
      onRefresh={refetch}
      refreshing={isRefetching}
      showBottomLoader={hasNextPage}
    />
  );
};

const styles = StyleSheet.create({
  skeletonListContainer: {
    flex: 1,
    width: '100%',
  },
});
