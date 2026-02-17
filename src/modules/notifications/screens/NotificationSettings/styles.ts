import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  containerCentered: {
    justifyContent: 'center',
  },
  permissionBlock: {
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.main10,
    borderRadius: 12,
  },
  permissionText: {
    color: COLORS.main,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
