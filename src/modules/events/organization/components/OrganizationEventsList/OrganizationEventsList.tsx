import { AppFlashList } from '@components';
import { OrganizationEventCard } from '../../ui';
import { OrgEventListItemDto, useGetOrgEvents } from '@actions';
import { StyleSheet, View } from 'react-native';
import { IOrganizationEventsListProps } from './types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useRefetchQuery } from '@hooks';
import {
  ActionConfirmationModal,
  ActionConfirmationModalRef,
} from '@modules/common';
import { useRef } from 'react';

export const OrganizationEventsList = ({
  filters,
}: IOrganizationEventsListProps) => {
  const actionConfirmationModalRef = useRef<ActionConfirmationModalRef>(null);

  const {
    data: eventsResponse,
    isLoading,
    refetch,
    hasNextPage,
  } = useGetOrgEvents(filters);

  console.log('eventsResponse', eventsResponse);

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const renderEventCard = ({ item }: { item: OrgEventListItemDto }) => (
    <OrganizationEventCard
      event={item}
      actionConfirmationModalRef={actionConfirmationModalRef}
    />
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

  return (
    <>
      <AppFlashList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderEventCard}
        gap={4}
        withBottomTab
        skeleton={isLoading ? ListSkeletonComponent : undefined}
        emptyText="No events found"
        onRefresh={refetchQuery}
        refreshing={isRefetchingQuery}
        showBottomLoader={hasNextPage}
      />

      <ActionConfirmationModal ref={actionConfirmationModalRef} />
    </>
  );
};

const styles = StyleSheet.create({
  skeletonListContainer: {
    flex: 1,
    width: '100%',
  },
});
