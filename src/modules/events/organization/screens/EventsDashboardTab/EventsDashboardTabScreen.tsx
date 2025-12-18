import { AppText, GridBoard } from '@ui';

import { EventsDashboardScreenLayout } from '../../layouts';
import { OrganizationEventsList } from '../../components';
import { eventDashboardConfig } from '../../configs';
import { IEventData } from '../../ui';

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
  return (
    <EventsDashboardScreenLayout>
      <GridBoard items={eventDashboardConfig} />

      <AppText typography="extra_bold_18" margin={{ bottom: 16 }}>
        Today’s Events
      </AppText>

      <OrganizationEventsList events={events} cardType="active" />
    </EventsDashboardScreenLayout>
  );
};
