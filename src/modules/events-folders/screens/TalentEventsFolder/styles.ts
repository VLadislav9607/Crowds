import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  headerStyles: {
    backgroundColor: COLORS.black,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    gap: 8,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  buttonsWrapper: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
