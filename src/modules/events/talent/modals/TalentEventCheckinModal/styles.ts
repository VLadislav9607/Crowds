import { COLORS } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  checkinButton: {
    backgroundColor: COLORS.green,
  },
  imageBackground: {
    height: 156,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    marginBottom: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContentContainer:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 20
  },
  modalContentContainer: {
   paddingBottom: 16,
   paddingTop: 16,
   paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  image: {
    width: 69,
    height: 69,
    borderRadius: 5,
    backgroundColor: COLORS.gray,
  },
});
