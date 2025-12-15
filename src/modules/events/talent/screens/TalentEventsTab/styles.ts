import { COLORS } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  header: {
    backgroundColor: COLORS.black,
    paddingBottom: 16,
    paddingHorizontal: 0,
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    paddingHorizontal: 17,
  },
  eventsListContent: {
    paddingTop: 16,
  },
});