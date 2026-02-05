import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemSeparator: {
    height: 8,
  },
  emptyContainer: {
    flex: 1,
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptySubtitle: {
    textAlign: 'center',
  },
  emptyButton: {
    width: 245,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  item: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
  },
  itemContent: {
    flexDirection: 'row',
    gap: 16,
  },
  qrCodeImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    gap: 8,
  },
  itemTitleBlock: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  itemTitle: {
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  shareButton: {
    borderRadius: 12,
    // borderColor: COLORS.gray_primary,
    marginTop: 16,
  },
  generateQRCodeButton: {
    marginTop: 16,
    borderRadius: 20,
    borderColor: COLORS.main,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  generateQRCodeButtonTitle: {
    color: COLORS.main,
  },
  containerStyle: {
    paddingBottom: 0,
  },
});
