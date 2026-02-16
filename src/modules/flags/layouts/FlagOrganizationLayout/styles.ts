import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  orgInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orgLogo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.black_20,
  },
  orgDetails: {
    marginLeft: 16,
    gap: 2,
  },
});
