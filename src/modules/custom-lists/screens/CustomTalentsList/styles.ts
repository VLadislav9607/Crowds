import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    paddingRight: 36,
  },
  buttonContainer: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlusButton: {
    position: 'absolute',
    right: 16,
    top: '160%',
    backgroundColor: COLORS.main,
    borderRadius: 100,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
