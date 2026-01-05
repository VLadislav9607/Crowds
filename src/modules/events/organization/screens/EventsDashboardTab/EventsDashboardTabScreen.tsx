import { AppText, GridBoard } from '@ui';

import { EventsDashboardScreenLayout } from '../../layouts';
import { eventDashboardConfig } from '../../configs';
import { useGetOrgEvents } from '@actions';

export const EventsDashboardTabScreen = () => {
  const { data: eventsTest } = useGetOrgEvents({});
  console.log('eventsTest', eventsTest);
  return (
    <EventsDashboardScreenLayout>
      <GridBoard items={eventDashboardConfig} />

      <AppText typography="extra_bold_18" margin={{ bottom: 16 }}>
        Today’s Events
      </AppText>

      {/* <OrganizationEventsList events={events} cardType="active" /> */}
    </EventsDashboardScreenLayout>
  );
};
