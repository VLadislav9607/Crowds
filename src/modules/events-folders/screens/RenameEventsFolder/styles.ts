import { StyleSheet } from 'react-native';
import { DIMENSIONS } from '@constants';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  headerStyles: {
    backgroundColor: COLORS.black,
  },
  container: {
    flexGrow: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  button: {
    marginHorizontal: 20,
    width: DIMENSIONS.width - 40,
  },
});
