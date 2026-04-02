import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  talentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  talentInfo: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray_200,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  loader: {
    paddingVertical: 16,
  },
});
