import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { AppText } from '@ui';

import { OrganizationEventCard, EventCardType, IEventData } from '../../ui';

interface IProps {
  events: IEventData[];
  cardType: EventCardType;
}

export const OrganizationEventsList = ({ events, cardType }: IProps) => {
  const renderEventCard = ({ item }: { item: IEventData }) => (
    <OrganizationEventCard event={item} cardType={cardType} />
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
