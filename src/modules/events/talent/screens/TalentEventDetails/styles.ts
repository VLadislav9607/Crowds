import { StyleSheet } from "react-native";
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      gap: 24,
      paddingTop: 20,
    },
    header:{
      paddingBottom: 30
    },
    chatButtonsContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    chatButton: {
      flex: 1,
    },
    taskBanner: {
      backgroundColor: COLORS.light_purple,
      borderRadius: 12,
      padding: 16,
      borderLeftWidth: 4,
      borderLeftColor: COLORS.main,
    },
    taskUploadSection: {
      gap: 12,
    },
    taskPhotoPreview: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      overflow: 'hidden',
    },
    taskPhotoImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
});