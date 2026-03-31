import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.light_purple,
    borderRadius: 12,
  },
  taskRowCompleted: {
    backgroundColor: COLORS.main_10,
  },
  taskRowDisabled: {
    opacity: 0.45,
  },
  taskText: {
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
  },
  iconCompleted: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSystem: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.main_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconUnchecked: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.light_gray3,
  },
});
