import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  hqBadge: {
    backgroundColor: COLORS.main,
    width: 35,
    height: 23,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opsBadge: {
    backgroundColor: COLORS.blue,
    width: 42,
    height: 23,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
