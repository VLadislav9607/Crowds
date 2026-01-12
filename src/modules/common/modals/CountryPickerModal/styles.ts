import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 24,
    marginTop: 24,
  },
  scrollView: {
    marginTop: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  separator: {
    height: 8,
  },
  countryItem: {
    minHeight: 46,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 10,
  },
  countryItemSelected: {
    borderColor: COLORS.main,
    backgroundColor: COLORS.main_10,
  },
  disabledCountryItem: {
    opacity: 0.5,
  },
  countryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  flagText: {
    fontSize: 24,
  },
  doneButton: {
    position: 'absolute',
    left: 16,
  },
});
