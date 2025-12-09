import { useState } from 'react';
import { AppTabSelector } from '@components';
import { GridBoard } from '@ui';

import { EventsDashboardScreenLayout } from '../../layouts';
import { OrganizationEventsList } from '../../components';
import { eventDashboardConfig } from '../../configs';

const events = [
  {
    id: 1,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
  },
  {
    id: 2,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
  },
];

export const EventsDashboardTabScreen = () => {
  const [selectedTab, setSelectedTab] = useState('active');
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
        onSelect={setSelectedTab}
      />

      <OrganizationEventsList events={events} />
    </EventsDashboardScreenLayout>
  );
};
