import { DIMENSIONS } from '@constants';
import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  folderContainer: {
    height: 74,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.light_gray3,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyText: {
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 20,
    width: DIMENSIONS.width - 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    gap: 8,
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerStyles: {
    backgroundColor: COLORS.black,
  },
});
