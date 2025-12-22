import { COLORS, TYPOGRAPHY } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textInput: {
    height: 38,
    ...TYPOGRAPHY.regular_14,
    color: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingLeft: 0,
  },
  listContainer: {
    maxHeight: 200,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginTop: 4,
  },
  list: {
    maxHeight: 200,
  },
  row: {
    paddingHorizontal: 0,
    paddingVertical: 6,
    justifyContent:'center',
    minHeight:42,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black_10,
  },
  rowText: {
    ...TYPOGRAPHY.regular_14,
    color: COLORS.black,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

