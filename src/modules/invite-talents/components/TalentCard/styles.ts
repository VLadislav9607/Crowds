import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 12,
    borderRadius: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
  invitedIcon: {
    backgroundColor: COLORS.light_green_10,
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
