import { AppText, GridBoard } from '@ui';

import { EventsDashboardScreenLayout } from '../../layouts';
import { useGetMe, useGetOrgEventsCounters } from '@actions';
import { COLORS } from '@styles';
import { If, NoAccess, TestBadge } from '@components';
import { styles } from './styles';
import { OrganizationEventsList } from '../../components';
import { useCallback, useMemo, useState } from 'react';
import { startOfDay, endOfDay } from 'date-fns';
import { goToScreen, Screens } from '@navigation';

export const EventsDashboardTabScreen = () => {
  const { organizationMember } = useGetMe();

  const [today, setToday] = useState(() => new Date());

  const todayStart = useMemo(() => startOfDay(today).toISOString(), [today]);
  const todayEnd = useMemo(() => endOfDay(today).toISOString(), [today]);

  const handleRefreshNow = useCallback(() => {
    setToday(new Date());
  }, []);

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

  const navigateToEvents = (initialTab: string, initialSubTab?: string) => {
    goToScreen(Screens.BottomTabs, {
      screen: Screens.UpcomingEvents,
      params: { initialTab, initialSubTab },
    } as any);
  };

  const eventDashboardConfig = [
    {
      title: 'Active Posted Events',
      subTitle: 'For invited talents & publicly posted events',
      count: activePublicCount + upcomingPublicCount,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      showSkeleton: isLoading,
      onPress: () => navigateToEvents('active', 'job_board'),
    },
    {
      title: 'Active Private Events',
      subTitle: 'For invited talents only',
      count: activePrivateCount + upcomingPrivateCount,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      showSkeleton: isLoading,
      onPress: () => navigateToEvents('active', 'private'),
    },
    {
      title: 'Past Events',
      count: eventsCountersResp?.past || 0,
      bgColor: '#E0025214',
      textColor: COLORS.red,
      showSkeleton: isLoading,
      onPress: () => navigateToEvents('past'),
    },
    {
      title: 'Drafts',
      count: eventsCountersResp?.draft || 0,
      bgColor: '#F5F5F5',
      textColor: COLORS.main,
      showSkeleton: isLoading,
      onPress: () => navigateToEvents('drafts'),
    },
  ];

  return (
    <EventsDashboardScreenLayout>
      <TestBadge />
      <If condition={hasViewEventsAccess}>
        <GridBoard items={eventDashboardConfig} />

        <AppText typography="extra_bold_18" margin={{ bottom: 16 }}>
          Today’s Events
        </AppText>

        <OrganizationEventsList
          filters={{
            brand_id: organizationMember?.current_context?.brand?.id!,
            status_filter: 'published',
            start_before: todayEnd,
            end_after: todayStart,
          }}
          onRefresh={handleRefreshNow}
        />
      </If>

      <If condition={!hasViewEventsAccess}>
        <NoAccess containerStyle={styles.noAccessContainer} />
      </If>
    </EventsDashboardScreenLayout>
  );
};
