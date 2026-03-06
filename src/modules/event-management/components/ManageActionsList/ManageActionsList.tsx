import { StyleSheet, View } from 'react-native';
import { ICONS } from '@assets';
import { IconText } from '@ui';
import { COLORS } from '@styles';
import { goToScreen, Screens } from '@navigation';

export const ManageActionsList = ({ eventId }: { eventId: string }) => {
  const manageActions = [
    {
      label: 'Generate QR Code',
      onPress: () => goToScreen(Screens.EventQRCodes, { eventId }),
    },
    {
      label: 'Invite Talents',
      onPress: () => goToScreen(Screens.InviteTalents, { eventId }),
    },
    {
      label: 'Message Talents',
      onPress: () => {},
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
