import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const MENU_WIDTH = 200;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  portal: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    elevation: 9999, // Android
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    minWidth: MENU_WIDTH,
    overflow: 'hidden',
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 16,
  },
});
