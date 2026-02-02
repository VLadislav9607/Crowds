import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  bottomSheetView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createFolderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: COLORS.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foldersList: {
    gap: 16,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  folderItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  skeletonWrapper: {
    gap: 16,
  },
});
