import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 20,
  },
  header: {
    paddingBottom: 30,
  },
  chatButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  chatButton: {
    flex: 1,
  },
  gridBoardContainer: {
    marginBottom: 0,
  },
  qrCodeButton: {
    flexDirection: 'row',
    height: 60,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.light_gray3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  qrCodeButtonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
