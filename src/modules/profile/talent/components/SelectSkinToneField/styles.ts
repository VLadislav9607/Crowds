import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';
import { DIMENSIONS } from '@constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  selectItem: {
    height: 44,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  underline: {
    height: 1,
    backgroundColor: COLORS.gray,
  },
  skinToneItemColor: {
    width: 16,
    height: 16,
    borderRadius: 3,
  },
  skinToneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  skinToneIcon: {
    width: 16,
    height: 16,
    borderRadius: 3,
  },
  scrollView: {
    height: DIMENSIONS.height * 0.9,
  },
});
