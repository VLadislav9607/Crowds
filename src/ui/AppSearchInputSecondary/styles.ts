import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 6,
  },
  leftIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
    ...TYPOGRAPHY.regular_14,
    height: 20,
    overflow: 'hidden',
    paddingTop: 3,
  },
});
