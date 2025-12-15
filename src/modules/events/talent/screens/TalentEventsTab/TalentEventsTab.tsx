import { AppTabSelector, ITabOption, ScreenWrapper } from '@components';
import { TalentEventsList } from '../../components';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { TalentEventStatus } from '../../../types';
import { styles } from './styles';

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
      headerVariant='withTitle'
      showBackButton={false}
      title='Events'
      titleProps={{ style: styles.title }}
      headerStyles={styles.header}
      customElement={<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
        <AppTabSelector
          onSelect={(value) => setSelectedTab(value)}
          theme='black'
          options={tabOptions}
          selectedValue={selectedTab}
        />
      </ScrollView>}
    >

      <TalentEventsList
        type={selectedTab}
        contentContainerStyle={styles.eventsListContent}
      />

    </ScreenWrapper>
  );
};
