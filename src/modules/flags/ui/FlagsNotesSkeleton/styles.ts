import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    height: 16,
    width: 140,
    borderRadius: 8,
    backgroundColor: COLORS.gray,
    marginBottom: 16,
  },
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gray,
  },
  lineShort: {
    height: 12,
    width: 80,
    borderRadius: 6,
    backgroundColor: COLORS.gray,
  },
  lineMedium: {
    height: 14,
    width: '60%',
    borderRadius: 7,
    backgroundColor: COLORS.gray,
    marginTop: 4,
  },
  lineLong: {
    height: 12,
    width: '90%',
    borderRadius: 6,
    backgroundColor: COLORS.gray,
    marginTop: 8,
  },
});
