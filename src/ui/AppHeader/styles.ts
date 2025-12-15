import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  header: {
    // height: 156,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  logoHeaderInner: {
    width: '100%',
    alignItems: 'center',
  },
  titleHeaderInner: {
    width: '100%',
  },
  contentWrapperColumn: {
    flexDirection: 'row',
    gap: 14,
  },
  headerContentRow: {
    flexDirection: 'row',
    gap: 4,
  },
  headerWithLogo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerWithTitle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  withTitle: {
    flexDirection: 'row',
    gap: 14,
  },
  withTitleAndImageBg: {
    flexDirection: 'column',
    gap: 14,
    // paddingTop: 0,
    overflow: 'hidden',
  },
  backButton: {
    marginTop: -2,
  },
  title: {
    ...TYPOGRAPHY.bold_24,
    color: COLORS.white,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    flexDirection: 'row',
    gap: 14,
    flex: 1,
  },
  contentWrapperLogo: {
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
  },
  rightIconsWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
});
