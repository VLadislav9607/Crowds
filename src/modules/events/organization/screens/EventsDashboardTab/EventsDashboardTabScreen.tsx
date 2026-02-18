import { AppText, GridBoard } from '@ui';

import { EventsDashboardScreenLayout } from '../../layouts';
import { useGetMe, useGetOrgEventsCounters } from '@actions';
import { COLORS } from '@styles';
import { If, NoAccess } from '@components';
import { styles } from './styles';
// import { OrganizationEventsList } from '../../components';

export const EventsDashboardTabScreen = () => {
  const { organizationMember } = useGetMe();

  const hasViewEventsAccess =
    !!organizationMember?.current_context?.capabilitiesAccess.view_events;

  const { data: eventsCountersResp, isLoading } = useGetOrgEventsCounters({
    brand_id: organizationMember?.current_context?.brand?.id!,
  });

  const activePublicCount = eventsCountersResp?.active_public
    ? eventsCountersResp?.active_public
    : 0;
  const activePrivateCount = eventsCountersResp?.active_private
    ? eventsCountersResp?.active_private
    : 0;

  const upcomingPublicCount = eventsCountersResp?.upcoming_public
    ? eventsCountersResp?.upcoming_public
    : 0;
  const upcomingPrivateCount = eventsCountersResp?.upcoming_private
    ? eventsCountersResp?.upcoming_private
    : 0;

  const eventDashboardConfig = [
    {
      title: 'Active Posted Events',
      subTitle: 'For invited talents & publicly posted events',
      count: activePublicCount + upcomingPublicCount,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      // label: 'View',
      showSkeleton: isLoading,
    },
    {
      title: 'Active Private Events',
      subTitle: 'For invited talents only',
      count: activePrivateCount + upcomingPrivateCount,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      // label: 'View',
      showSkeleton: isLoading,
    },
    {
      title: 'Past Events',
      count: eventsCountersResp?.past || 0,
      bgColor: '#E0025214',
      textColor: COLORS.red,
      // label: 'View',
      showSkeleton: isLoading,
    },
    {
      title: 'Drafts',
      count: eventsCountersResp?.draft || 0,
      bgColor: '#F5F5F5',
      textColor: COLORS.main,
      // label: 'View',
      showSkeleton: isLoading,
    },
  ];

  return (
    <EventsDashboardScreenLayout>
      <If condition={hasViewEventsAccess}>
        <GridBoard items={eventDashboardConfig} />

        <AppText typography="extra_bold_18" margin={{ bottom: 16 }}>
          Today’s Events
        </AppText>

        {/* <OrganizationEventsList filters={{
        brand_id: organizationMember?.current_context?.brand?.id!,
        status_filter: 'published',
        start_after: new Date().toISOString(),
      }} /> */}
      </If>

      <If condition={!hasViewEventsAccess}>
        <NoAccess containerStyle={styles.noAccessContainer} />
      </If>
    </EventsDashboardScreenLayout>
  );
};
