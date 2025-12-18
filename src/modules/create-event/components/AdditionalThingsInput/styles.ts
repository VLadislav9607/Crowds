import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const MAX_CHARACTERS = 150;

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: COLORS.main_10,
    borderRadius: 8,
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
});
