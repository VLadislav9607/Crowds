import { DIMENSIONS } from '@constants';
import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    height: 50,
    backgroundColor: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_200,
  },
  pdf: {
    flex: 1,
    width: DIMENSIONS.width,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 20,
  },
  bottomSection: {
    padding: 16,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_200,
  },
});
