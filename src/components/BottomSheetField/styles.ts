import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  triggerContainer: {
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
    justifyContent: 'space-between',
    height: 38,
  },
  disabledInputWrapper: {
    borderBottomColor: COLORS.black_20,
  },

  errorMessage: {
    marginTop: 8,
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray,
  },
  bottomSheetContent: {
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
