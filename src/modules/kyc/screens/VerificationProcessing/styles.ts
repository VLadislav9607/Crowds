import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  topSpacer: {
    flex: 1,
  },
  bottomSpacer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
  progressText: {
    textAlign: 'center',
  },
  retryButton: {
    alignSelf: 'stretch',
  },
});
