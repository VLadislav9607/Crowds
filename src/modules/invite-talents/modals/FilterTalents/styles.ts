import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '@styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const MAX_CONTENT_HEIGHT = SCREEN_HEIGHT * 0.9;

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
  scrollContent: {
    gap: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  clearButtonWrapper: {
    flex: 1,
    borderColor: COLORS.main,
  },
  applyButtonWrapper: {
    flex: 1,
  },
});
