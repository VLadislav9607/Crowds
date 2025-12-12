import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 3,
    marginRight: 10,
  },
  noShowContainer: {
    backgroundColor: COLORS.red,
    width: 70,
    borderRadius: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

