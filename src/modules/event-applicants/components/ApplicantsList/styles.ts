import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  messageButton: {
    backgroundColor: COLORS.main10,
    gap: 6,
  },
  messageButtonText: {
    color: COLORS.black,
    ...TYPOGRAPHY.regular_12,
  },
  appliedAction: {
    flexDirection: 'row',
    gap: 16,
  },
  acceptButton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
  },
  declineButton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.red,
  },
});
