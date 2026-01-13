import { AppTabSelector, ITabOption, ScreenWrapper } from '@components';
import { useState } from 'react';
import { TalentEventStatus } from '../../../types';
import { styles } from './styles';
import { TalentEventsList } from '../../components';
import { View } from 'react-native';

export const TalentEventsTab = () => {
  const [selectedTab, setSelectedTab] = useState<TalentEventStatus>('proposed');

  const tabOptions: ITabOption<TalentEventStatus>[] = [
    { label: 'Proposals', value: 'proposed', badge: 10 },
    { label: 'Pending', value: 'pending', badge: 5 },
    { label: 'Approved', value: 'approved', badge: 3 },
    { label: 'Denied', value: 'denied', badge: 2 },
  ];

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      showBackButton={false}
      containerStyle={styles.container}
      title="Events"
      titleProps={{ style: styles.title }}
      headerStyles={styles.header}
      customElement={
        <AppTabSelector
          onSelect={value => setSelectedTab(value)}
          theme="black"
          options={tabOptions}
          selectedValue={selectedTab}
          containerStyle={styles.tabsContainer}
        />
      }
    >
      <View />
      {/* <TalentEventsList
        type={selectedTab}
        contentContainerStyle={[
          styles.eventsListContent,
          { paddingBottom: 90 },
        ]}
      /> */}
    </ScreenWrapper>
  );
};
