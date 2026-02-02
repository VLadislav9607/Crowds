import { COLORS, SHADOWS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    ...SHADOWS.card,
    flexDirection: 'row',
    overflow: 'hidden',
    boxShadow: '0px 1px 8px 0px #0000001F',
  },
  imageContainer: {
    width: 80,
    height: '100%',
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  content: {
    padding: 10,
    flex: 1,
    gap: 8,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  contentHeaderLeft: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pricePadge: {
    height: 26,
    flexDirection: 'row',
    gap: 4,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray_20,
    paddingHorizontal: 10,
  },
  separatorDashedLine: {
    height: 1,
    backgroundColor: COLORS.gray_20,
  },
  redButton: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.red_20,
    borderRadius: 100,
  },
  greenButton: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.light_green_10,
    borderRadius: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  eventDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  approvedButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  messageButtonWrapper: {
    width: 117,
  },
  saveButton: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
