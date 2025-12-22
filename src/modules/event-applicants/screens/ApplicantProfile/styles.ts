import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    bottom: -120,
    zIndex: 100,
    width: '100%',
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 120,
    paddingHorizontal: 20,
    gap: 24,
    paddingBottom: 80,
  },
  headerStyles: {
    backgroundColor: COLORS.black,
    paddingBottom: 55,
  },
  label: {
    ...TYPOGRAPHY.bold_18,
    lineHeight: 24,
    marginBottom: 10,
  },
  description: {
    ...TYPOGRAPHY.regular_14,
    lineHeight: 20,
  },
  photo: {
    width: 165,
    height: 200,
    borderRadius: 10,
  },
  availability: {
    ...TYPOGRAPHY.bold_14,
    lineHeight: 20,
    color: COLORS.vivid_green,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.light_green_10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
});
