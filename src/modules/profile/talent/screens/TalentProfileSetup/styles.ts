import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    bottom: -120,
    zIndex: 100,
    width: '100%',
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 120,
  },
  headerStyles: {
    backgroundColor: COLORS.black,
    paddingBottom: 55,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
});
