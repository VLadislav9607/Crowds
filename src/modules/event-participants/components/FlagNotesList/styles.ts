import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  noteItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noteFlagDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  noteTitle: {
    marginTop: 4,
  },
  noteDescription: {
    marginTop: 4,
  },
});
