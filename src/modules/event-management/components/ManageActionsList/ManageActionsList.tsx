import { StyleSheet, View } from 'react-native';
import { ICONS } from '@assets';
import { IconText } from '@ui';
import { COLORS } from '@styles';

export const ManageActionsList = () => {
  const manageActions = [
    {
      label: 'Generate QR Code',
      onPress: () => {},
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
      label: 'Offer job extension to talent ',
      onPress: () => {},
    },
    {
      label: 'View No Show',
      onPress: () => {},
    },
    {
      label: 'View Check-Outs & Task Completed',
      onPress: () => {},
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
