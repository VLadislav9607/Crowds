import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    marginTop: 8,
  },
  selectedContainer: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  content: {
    flex: 1,
    gap: 4,
  },
});
