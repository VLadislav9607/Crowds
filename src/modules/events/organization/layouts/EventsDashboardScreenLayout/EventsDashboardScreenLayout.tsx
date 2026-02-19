import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { If, ScreenWrapper } from '@components';
import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';
import { TYPOGRAPHY } from '@styles';

import { EventTypeCreationModal } from '../../modals';
import { useGetMe } from '@actions';

interface IProps {
  children: React.ReactNode;
}

export const EventsDashboardScreenLayout = ({ children }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { organizationMember } = useGetMe();

  const currentContext = organizationMember?.current_context;

  const hasCreateEventsAccess =
    !!currentContext?.capabilitiesAccess.create_events;
  const hasCreateEventDraftAccess =
    !!currentContext?.capabilitiesAccess.create_event_draft;

  return (
    <ScreenWrapper
      headerVariant="withLogoAndImageBg"
      withBottomTabBar={true}
      contentContainerStyle={styles.contentContainer}
    >
      <If condition={hasCreateEventsAccess || hasCreateEventDraftAccess}>
        <View style={styles.row}>
          <AppText typography="extra_bold_18">Events Dashboard</AppText>
          <AppButton
            icon={ICONS.plus()}
            title={hasCreateEventsAccess ? 'Create Event' : 'Create Draft'}
            size="28"
            wrapperStyles={styles.createEventButton}
            titleStyles={styles.createEventButtonText}
            onPress={() => setIsModalOpen(true)}
          />
        </View>
      </If>
      {/* <View style={styles.row}>
          <AppText typography="extra_bold_18">Events Dashboard</AppText>
          <AppButton
            icon={ICONS.plus()}
            title={hasCreateEventsAccess ? "Create Event" : "Create Draft"}
            size="28"
            wrapperStyles={styles.createEventButton}
            titleStyles={styles.createEventButtonText}
            onPress={() => setIsModalOpen(true)}
          />
        </View> */}

      {children}

      <EventTypeCreationModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  createEventButton: {
    width: 135,
    paddingHorizontal: 0,
    gap: 5,
  },
  createEventButtonText: {
    ...TYPOGRAPHY.bold_12,
    textTransform: 'uppercase',
  },
});
