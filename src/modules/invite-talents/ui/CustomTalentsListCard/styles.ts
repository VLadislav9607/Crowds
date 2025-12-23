import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    gap: 8,
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
});
