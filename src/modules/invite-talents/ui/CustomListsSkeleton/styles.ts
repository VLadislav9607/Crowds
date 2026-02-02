import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    height: 74,
  },
});
