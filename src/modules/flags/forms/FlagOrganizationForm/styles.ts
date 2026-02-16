import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  selectFlagSection: {
    marginBottom: 16,
  },
  flagOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 24,
  },
  flagCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  flagCircleSelected: {
    borderWidth: 2,
  },
  noteText: {
    marginBottom: 24,
  },
  reasonTitle: {
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
});
