import { COLORS, SHADOWS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
  },
  tabSelector: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  invitedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: COLORS.gray_300,
    borderRadius: 8,
    padding: 6,
    paddingLeft: 14,
  },
  inviteMoreButton: {
    borderRadius: 4,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.off_white,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    ...SHADOWS.field,
    backgroundColor: COLORS.white,
  },
  sortByText: {
    opacity: 0.5,
    textAlign: 'right',
  },
});
