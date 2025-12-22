import { StyleSheet } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  description: {
    ...TYPOGRAPHY.regular_14,
    lineHeight: 22,
    marginBottom: 16,
  },
  warningText: {
    ...TYPOGRAPHY.medium_14,
    color: COLORS.red,
    lineHeight: 22,
    marginBottom: 32,
  },
});
