import { COLORS, SHADOWS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    marginBottom: 7,
    paddingHorizontal: 20,
  },
  searchInputButton: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    flex: 1,
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
  filterButtonActive: {
    borderWidth: 2,
    borderColor: COLORS.main,
  },
  filterButtonCounter: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  container: {
    paddingBottom: 0,
  },
  listContentContainer: {
    paddingTop: 7,
  },
});
