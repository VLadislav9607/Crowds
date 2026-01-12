import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  addBranchButton: {
    borderWidth: 2,
    borderColor: COLORS.main,
    borderRadius: 20,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    gap: 10,
    marginTop: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.main10,
    minHeight: 76,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.main,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
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
  branchesList: {
    gap: 8,
    marginTop: 16,
  },
  branch: {
    gap: 12,
    minHeight: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  branchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  branchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
