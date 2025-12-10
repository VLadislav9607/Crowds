import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.light_gray2,
    backgroundColor: COLORS.white,
    gap: 8,
  },
  optionSelected: {
    borderColor: COLORS.main,
    backgroundColor: COLORS.light_purple,
  },
  radio: {
    width: 14,
    height: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: '#65558F',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#65558F',
  },
  content: {
    flex: 1,
    gap: 4,
  },
});
