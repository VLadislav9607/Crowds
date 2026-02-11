import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  opsBadge: {
    backgroundColor: COLORS.blue,
    width: 42,
    height: 23,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonsContainer: {
    gap: 8,
  },
  selectButton: {
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 20,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderStyle: 'dashed',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hqBadge: {
    backgroundColor: COLORS.main,
    width: 35,
    height: 23,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hqContainer: {
    gap: 12,
    backgroundColor: COLORS.main10,
    paddingTop: 16,
    paddingBottom: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.main,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  hqInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hqInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flag: {
    fontSize: 24,
  },
  countryName: {
    flex: 1,
  },
  changeButton: {
    width: 86,
    paddingHorizontal: 0,
    borderColor: COLORS.gray,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray_20,
    marginVertical: 24,
  },
});
