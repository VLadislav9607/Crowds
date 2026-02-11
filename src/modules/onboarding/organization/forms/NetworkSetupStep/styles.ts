import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  networkSetupContainer: {
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    paddingVertical: 12,
    borderRadius: 16,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flag: {
    fontSize: 24,
  },
  networkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 16,
  },
  networkItemSeparator: {
    height: 1,
    backgroundColor: COLORS.light_gray3,
    marginVertical: 12,
  },
  branchItem: {
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  branchInfo: {
    flex: 1,
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
  addBranchButtonText: {
    color: COLORS.main,
  },
  branchesList: {
    marginTop: 16,
    gap: 8,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.light_gray3,
    marginVertical: 16,
  },
  decisionMakerContainer: {
    gap: 10,
  },
});
