import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
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
    flex: 1,
  },
  branchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
