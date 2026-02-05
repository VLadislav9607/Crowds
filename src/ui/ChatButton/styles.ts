import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    padding: 12,
    gap: 4,
    overflow: 'hidden',
  },
  borderNone: {
    borderWidth: 0,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  loadingIndicator: {
    position: 'absolute',
    top: 14,
    left: 0,
    right: 0,
  },
  skeletonContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
