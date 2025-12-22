import { COLORS, SHADOWS } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32, paddingHorizontal: 20
  },
  searchInputButton: {
    flex:1
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
  categoriesScrollView: {
    flexDirection: 'column',
    rowGap: 16,
    paddingHorizontal: 20
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 20,
  },
  categoryButton: {
    borderWidth: 6,
    borderColor: COLORS.black,
    height: 130,
    width: 130,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.light_purple

  },
  categoryOverlay: {
    backgroundColor: COLORS.black_50,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 32,
    paddingHorizontal: 20
  },
  listContentContainer: {
    paddingTop: 16,
  },
});