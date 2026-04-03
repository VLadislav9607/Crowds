import { COLORS, SHADOWS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // paddingBottom: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  searchInputButton: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    pointerEvents: 'none',
    borderColor: COLORS.off_white,
    backgroundColor: COLORS.white,
    ...SHADOWS.field,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.off_white,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    ...SHADOWS.field,
    backgroundColor: COLORS.white,
  },
  listTitle: {
    marginBottom: 16,
    marginTop: 32,
    paddingHorizontal: 20,
  },
  listContentContainer: {
    paddingTop: 16,
    justifyContent: 'flex-start',
  },
  emptyText: {
    marginTop: 40,
  },
});
