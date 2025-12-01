import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 52,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 19,
  },

  input: {
    flexGrow: 1,
    ...TYPOGRAPHY.regular_12,
    height: 20,
    overflow: 'hidden',
    paddingTop: 3,
  },
  icon: {
    marginHorizontal: 17,
  },
});
