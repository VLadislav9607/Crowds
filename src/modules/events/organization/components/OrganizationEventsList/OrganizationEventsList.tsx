import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { AppText } from '@ui';

import { OrganizationEventCard } from '../../ui';

interface IProps {
  events: any[];
}

export const OrganizationEventsList = ({ events }: IProps) => {
  const renderEventCard = ({ item }: any) => (
    <OrganizationEventCard
      name={item.name}
      location={item.location}
      image={item.image}
      startDate={item.startDate}
      isDraft={item.isDraft}
      participants={item.participants}
      maxParticipants={item.maxParticipants}
    />
  );

  return (
    <FlashList
      data={events}
      keyExtractor={item => item.id}
      contentContainerStyle={
        events.length === 0 ? styles.centerContent : styles.container
      }
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderEventCard}
      ListEmptyComponent={
        <AppText typography="medium_14" color="gray" style={styles.emptyText}>
          No events found
        </AppText>
      }
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 16,
  },
  emptyText: {
    textAlign: 'center',
  },
});
