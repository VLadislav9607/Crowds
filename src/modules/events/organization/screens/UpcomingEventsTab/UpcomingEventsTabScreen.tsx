import { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { AppTabSelector, If, ScreenWrapper } from '@components';

import { OrganizationEventsList } from '../../components';

export const UpcomingEventsTabScreen = () => {
  const [mainTab, setMainTab] = useState('active');
  const [activeSubTab, setActiveSubTab] = useState('job_board');

  const now = useMemo(() => new Date().toISOString(), []);

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
            { label: 'Active', value: 'active' },
            { label: 'Drafts', value: 'drafts' },
            { label: 'Past', value: 'past' },
          ]}
          selectedValue={mainTab}
          onSelect={setMainTab}
        />
      }
    >
      <If condition={mainTab === 'active'}>
        <AppTabSelector
          options={[
            { label: 'Job Board', value: 'job_board', badge: 10 },
            { label: 'Private', value: 'private' },
          ]}
          selectedValue={activeSubTab}
          onSelect={setActiveSubTab}
        />
      </If>

      <OrganizationEventsList
        filters={{
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
