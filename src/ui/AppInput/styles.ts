import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 4,
  },
  inputWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  disabledInputWrapper: {
    borderBottomColor: COLORS.black_20,
  },
  input: {
    ...TYPOGRAPHY.regular_14,
    color: COLORS.black,
    height: 37,
    paddingTop: 3,
    flexGrow: 1,
  },
  errorMessage: {
    marginTop: 8,
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray,
  },
});
