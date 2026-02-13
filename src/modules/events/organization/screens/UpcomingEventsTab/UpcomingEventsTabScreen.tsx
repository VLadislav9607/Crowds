import { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { AppTabSelector, If, ScreenWrapper } from '@components';

import { OrganizationEventsList } from '../../components';
import { useGetMe, useGetOrgEventsCounters } from '@actions';

export const UpcomingEventsTabScreen = () => {
  const [mainTab, setMainTab] = useState('active');
  const [activeSubTab, setActiveSubTab] = useState('job_board');
  const { organizationMember } = useGetMe();
  const now = useMemo(() => new Date().toISOString(), []);

  const { data: eventsCounters } = useGetOrgEventsCounters({
    brand_id: organizationMember?.current_context?.brand?.id!,
  });

  const activeCount = eventsCounters?.active ? eventsCounters?.active : 0;
  const upcomingCount = eventsCounters?.upcoming ? eventsCounters?.upcoming : 0;

  const activePublicCount = eventsCounters?.active_public
    ? eventsCounters?.active_public
    : 0;
  const activePrivateCount = eventsCounters?.active_private
    ? eventsCounters?.active_private
    : 0;

  const upcomingPublicCount = eventsCounters?.upcoming_public
    ? eventsCounters?.upcoming_public
    : 0;
  const upcomingPrivateCount = eventsCounters?.upcoming_private
    ? eventsCounters?.upcoming_private
    : 0;

  return (
    <ScreenWrapper
      showBackButton={false}
      headerVariant="withTitleAndImageBg"
      withBottomTabBar={true}
      title="Events"
      titleProps={{ style: { textAlign: 'center' } }}
      contentContainerStyle={styles.contentContainer}
      customElement={
        <AppTabSelector
          theme="black"
          marginBottom={0}
          options={[
            {
              label: 'Active',
              value: 'active',
              badge: activeCount + upcomingCount,
            },
            { label: 'Drafts', value: 'drafts', badge: eventsCounters?.draft },
            { label: 'Past', value: 'past', badge: eventsCounters?.past },
          ]}
          selectedValue={mainTab}
          onSelect={setMainTab}
        />
      }
    >
      <If condition={mainTab === 'active'}>
        <AppTabSelector
          options={[
            {
              label: 'Job Board',
              value: 'job_board',
              badge: activePublicCount + upcomingPublicCount,
            },
            {
              label: 'Private',
              value: 'private',
              badge: activePrivateCount + upcomingPrivateCount,
            },
          ]}
          selectedValue={activeSubTab}
          onSelect={setActiveSubTab}
        />
      </If>

      <OrganizationEventsList
        filters={{
          brand_id: organizationMember?.current_context?.brand?.id!,
          status_filter: mainTab === 'drafts' ? 'draft' : 'published',
          ...(mainTab === 'past' && { end_before: now }),
          ...(mainTab === 'active' && { end_after: now }),
          visibility_filter:
            mainTab === 'active'
              ? activeSubTab === 'job_board'
                ? 'public'
                : 'private'
              : undefined,
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
