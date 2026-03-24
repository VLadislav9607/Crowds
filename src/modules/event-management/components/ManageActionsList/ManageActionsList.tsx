import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ICONS } from '@assets';
import { IconText } from '@ui';
import { COLORS } from '@styles';
import { goToScreen, Screens } from '@navigation';
import { useGetMe } from '@actions';

interface ManageActionsListProps {
  eventId: string;
  eventStartAt?: string | null;
}

export const ManageActionsList = ({
  eventId,
  eventStartAt,
}: ManageActionsListProps) => {
  const { organizationMember } = useGetMe();
  const capabilitiesAccess =
    organizationMember?.current_context?.capabilitiesAccess;

  const isEventStarted = useMemo(() => {
    if (!eventStartAt) return false;
    return new Date() >= new Date(eventStartAt);
  }, [eventStartAt]);

  const manageActions = [
    ...(!isEventStarted && capabilitiesAccess?.manage_checkins
      ? [
          {
            label: 'Generate QR Code',
            onPress: () => goToScreen(Screens.EventQRCodes, { eventId }),
          },
        ]
      : []),
    ...(!isEventStarted && capabilitiesAccess?.recruit_applicants
      ? [
          {
            label: 'Invite Talents',
            onPress: () => goToScreen(Screens.InviteTalents, { eventId }),
          },
        ]
      : []),
    ...(capabilitiesAccess?.message_applicants
      ? [
          {
            label: 'Message Talents',
            onPress: () => goToScreen(Screens.MessageTalents, { eventId }),
          },
        ]
      : []),
    ...(capabilitiesAccess?.view_events
      ? [
          {
            label: 'Event Reports',
            onPress: () => goToScreen(Screens.EventReport, { eventId }),
          },
        ]
      : []),
    ...(capabilitiesAccess?.manage_checkins
      ? [
          {
            label: 'Checked-In Talents',
            onPress: () => goToScreen(Screens.CheckedInTalents, { eventId }),
          },
          {
            label: 'Checked-Out Talents',
            onPress: () => goToScreen(Screens.CheckedOutTalents, { eventId }),
          },
          {
            label: 'No Show Talents',
            onPress: () => goToScreen(Screens.NoShowTalents, { eventId }),
          },
          {
            label: 'Task Completions',
            onPress: () =>
              goToScreen(Screens.TaskCompletionTalents, { eventId }),
          },
        ]
      : []),
  ];

  return (
    <View style={styles.container}>
      {manageActions.map(action => (
        <IconText
          key={action.label}
          icon={ICONS.chevronRight()}
          text={action.label}
          activeOpacity={0.5}
          textProps={{
            typography: 'extra_bold_18',
            color: 'black',
          }}
          iconSize={20}
          style={styles.actionItem}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  actionItem: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
});
