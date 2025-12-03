import { StyleSheet, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';
import { AppText } from '@ui';

export const MasterAccessNote = () => {
  return (
    <View style={styles.noteContainer}>
      <View style={styles.noteContent}>
        <AppText style={styles.noteBoldText}>Please note</AppText>
        <AppText style={styles.noteText}>
          You can only have 2 master admins on your account.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flex: 1,
    position: 'relative',
    height: 45,
  },
  noteContent: {
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: '80%',
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.gray,
  },
  noteBoldText: {
    ...TYPOGRAPHY.bold_12,
    color: COLORS.main,
    letterSpacing: -0.01,
  },
  noteText: {
    ...TYPOGRAPHY.regular_12,
    letterSpacing: -0.01,
  },
});
