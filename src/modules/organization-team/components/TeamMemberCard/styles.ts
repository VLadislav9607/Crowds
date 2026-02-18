import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_50,
  },
  positionContainer: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: COLORS.main,
    borderRadius: 100,
    height: 25,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.white,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  secondaryText: {
    color: COLORS.dark_gray,
  },
  pendingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.yellow,
    marginLeft: 8,
  },
  pendingText: {
    color: COLORS.dark_blue,
  },
});
