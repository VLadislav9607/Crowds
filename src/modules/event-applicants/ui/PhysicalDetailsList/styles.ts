import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray_200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    marginRight: 6,
  },
});
