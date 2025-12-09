import { useState } from 'react';
import { AppTabSelector } from '@components';
import { GridBoard } from '@ui';

import { EventsDashboardScreenLayout } from '../../layouts';
import { OrganizationEventsList } from '../../components';
import { eventDashboardConfig } from '../../configs';
import { EventCardType, IEventData } from '../../ui';

const events: IEventData[] = [
  {
    id: '1',
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    date: '03 OCT, 2025',
    duration: '03 Hours',
  },
  {
    id: '2',
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    date: '03 OCT, 2025',
    duration: '03 Hours',
  },
];

export const EventsDashboardTabScreen = () => {
  const [selectedTab, setSelectedTab] = useState<EventCardType>('active');

  return (
    <EventsDashboardScreenLayout>
      <GridBoard items={eventDashboardConfig} />

      <AppTabSelector
        options={[
          { label: 'Active Events', value: 'active' },
          { label: 'Drafts', value: 'drafts' },
          { label: 'Past Events', value: 'past' },
        ]}
        selectedValue={selectedTab}
        onSelect={(value: string) => setSelectedTab(value as EventCardType)}
      />

      <OrganizationEventsList events={events} cardType={selectedTab} />
    </EventsDashboardScreenLayout>
  );
};
