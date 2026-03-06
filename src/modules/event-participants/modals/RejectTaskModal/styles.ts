import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  btn: {
    flex: 1,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: COLORS.red,
  },
});
