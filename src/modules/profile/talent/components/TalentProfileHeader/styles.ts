import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  textContainer: {
    flex: 1,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: COLORS.gray,
  },
  nameBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cnBadge: {
    width: 18,
    height: 12,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cnBadgeWithBorder: {
    borderColor: COLORS.green,
  },
  viewProfileButtonTitle: {
    letterSpacing: -0.01,
  },
  viewProfileButtonWrapper: {
    gap: 2,
    paddingLeft: 6,
  },
  infoTextContainer: {
    marginTop: 8,
  },
});
