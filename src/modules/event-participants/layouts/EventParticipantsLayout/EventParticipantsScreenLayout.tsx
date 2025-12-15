import { StyleSheet } from 'react-native';

import { AppTabSelector, ScreenWrapper } from '@components';
import { EventParticipantsScreenLayoutProps, ParticipantTab } from './types';

const TAB_OPTIONS = [
  { label: 'Checked In', value: 'checked_in' as const },
  { label: 'Checked Out', value: 'checked_out' as const },
  { label: 'Completers', value: 'completed_tasks' as const },
  { label: 'No Show', value: 'no_show' as const },
];

export const EventParticipantsScreenLayout = ({
  children,
  selectedTab,
  onTabChange,
}: EventParticipantsScreenLayoutProps) => {
  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      headerImageBg="crowd"
      title="Event Participants"
      contentContainerStyle={styles.contentContainer}
    >
      <AppTabSelector
        options={TAB_OPTIONS}
        selectedValue={selectedTab}
        onSelect={value => onTabChange(value as ParticipantTab)}
      />

      {children}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    flex: 1,
  },
});
