import { StyleSheet } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@styles';

export const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
    margin: 4,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    flex: 1,
    textTransform: 'uppercase',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.black_20,
  },
  dashedLine: {
    height: 0.5,
    borderWidth: 0.5,
    borderColor: COLORS.black_20,
    borderStyle: 'dashed',
  },
  infoContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 10,
    paddingRight: 10,
  },
  infoContent: {
    paddingVertical: 3.5,
    flex: 1,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    backgroundColor: COLORS.main_10,
  },
  primaryButtonText: {
    color: COLORS.main,
    textTransform: 'uppercase',
  },
  transparentButton: {
    backgroundColor: COLORS.transparent,
  },
  transparentButtonText: {
    color: COLORS.main,
    ...TYPOGRAPHY.semibold_10,
  },
  participants: {
    ...TYPOGRAPHY.medium_10,
    color: COLORS.main,
  },
  inviteTalentButtonText: {
    color: COLORS.red,
    ...TYPOGRAPHY.semibold_10,
  },
});
