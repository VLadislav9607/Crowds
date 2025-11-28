import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  header: {
    height: 156,
    paddingHorizontal: 16,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWithLogo: {
    alignItems: 'center',
  },
  withTitle: {
    flexDirection: 'row',
    gap: 14,
  },
  withTitleAndImageBg: {
    flexDirection: 'row',
    gap: 14,
    paddingTop: 0,
    overflow: 'hidden',
  },
  title: {
    ...TYPOGRAPHY.bold_24,
    color: COLORS.white,
    flex: 1,
  },
  backIcon: {
    marginBottom: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightIconsWrapper: {
    flexDirection: 'row',
    gap: 14,
  },
});
