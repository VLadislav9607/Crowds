import { AppFlashList } from '@components';

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
    <AppFlashList
      data={events}
      keyExtractor={item => item.id}
      renderItem={renderEventCard}
      gap={16}
      emptyText="No events found"
      withBottomTab
    />
  );
};
