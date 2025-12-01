import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  inputWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    flexDirection: 'row',
    gap: 8,
    height: 130,
    borderWidth: 1,
    borderColor: COLORS.gray,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  disabledInputWrapper: {
    borderBottomColor: COLORS.black_20,
  },
  input: {
    ...TYPOGRAPHY.regular_14,
    color: COLORS.black,
    flex: 1,
    textAlignVertical: 'top',
    lineHeight: 20,
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
