import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const MAX_CHARACTERS = 150;

export const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    marginBottom: 2,
  },
  defaultTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.main_10,
    borderRadius: 10,
    opacity: 0.7,
  },
  customTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.main_10,
    borderRadius: 10,
  },
  taskText: {
    flex: 1,
  },
  customTaskInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    paddingVertical: 2,
    paddingHorizontal: 0,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: COLORS.main,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 2,
  },
});
