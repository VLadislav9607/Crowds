import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  contentContainer: {
    gap: 30,
    flex: 1,
  },
  locationInputContainer: {
    marginTop: 8,
  },
  dateInputsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  dateInputFlex: {
    flex: 1,
  },
  jobTypeContainer: {
    gap: 14,
  },
  jobTypeRow: {
    flexDirection: 'row',
    gap: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  checkboxTextFlex: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
    // left: 0,
    // right: 0,
    paddingHorizontal: 20,
    // paddingBottom: 24,
  },
  clearButtonWrapper: {
    flex: 1,
    borderWidth: 0,
  },
  applyButtonWrapper: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
  },
});
