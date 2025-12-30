import { DIMENSIONS } from '@constants';
import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: DIMENSIONS.height * 0.7,
  },
  headerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flexGrow: 1,
    paddingBottom: 28,
  },
  item: {
    height: 30,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.gray_50,
  },
  itemSelected: {
    borderColor: COLORS.main,
    backgroundColor: COLORS.main,
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 16,
    marginBottom: 28,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    flex: 1,
  },
  footerButtonTitle: {
    color: COLORS.black,
  },
});
