import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 4,
  },
  cellsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  cellWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.off_white,
  },
  disabledCellWrapper: {
    opacity: 0.5,
  },
  cell: {
    ...TYPOGRAPHY.bold_20,
    color: COLORS.typography_black,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  errorMessage: {
    marginTop: 8,
  },
});
