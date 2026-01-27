import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '@styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const MAX_CONTENT_HEIGHT = SCREEN_HEIGHT * 0.85;

export const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  clearButtonWrapper: {
    flex: 1,
    borderColor: COLORS.main,
  },
  applyButtonWrapper: {
    flex: 1,
    marginTop: 24,
  },
});
