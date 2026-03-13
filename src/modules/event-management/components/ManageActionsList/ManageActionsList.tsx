import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ICONS } from '@assets';
import { IconText } from '@ui';
import { COLORS } from '@styles';
import { goToScreen, Screens } from '@navigation';

interface ManageActionsListProps {
  eventId: string;
  eventStartAt?: string | null;
}

export const ManageActionsList = ({
  eventId,
  eventStartAt,
}: ManageActionsListProps) => {
  const isEventStarted = useMemo(() => {
    if (!eventStartAt) return false;
    return new Date() >= new Date(eventStartAt);
  }, [eventStartAt]);

  const manageActions = [
    {
      label: 'Generate QR Code',
      onPress: () => goToScreen(Screens.EventQRCodes, { eventId }),
    },
    ...(!isEventStarted
      ? [
          {
            label: 'Invite Talents',
            onPress: () => goToScreen(Screens.InviteTalents, { eventId }),
          },
        ]
      : []),
    {
      label: 'Message Talents',
      onPress: () => goToScreen(Screens.MessageTalents, { eventId }),
    },
    {
      label: 'View Event Reports',
      onPress: () => {},
    },
    {
      label: 'View Checked-In Talents',
      onPress: () => goToScreen(Screens.CheckedInTalents, { eventId }),
    },
    {
      label: 'View Checked-Out Talents',
      onPress: () => goToScreen(Screens.CheckedOutTalents, { eventId }),
    },
    {
      label: 'View No Show Talents',
      onPress: () => goToScreen(Screens.NoShowTalents, { eventId }),
    },
    {
      label: 'View Task Completions',
      onPress: () => goToScreen(Screens.TaskCompletionTalents, { eventId }),
    },
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
