import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray_200,
    borderRadius: 8,
    padding: 10,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  hexBox: {
    position: 'absolute',
    left: 26,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 3,
  },
  checkbox: {
    gap: 36,
  },
});
