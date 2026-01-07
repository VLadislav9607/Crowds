import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  input: {
    flex: 1,
    height: 52,
    padding: 16,
    borderRadius: 104,
    backgroundColor: COLORS.white,
    color: COLORS.typography_black,
    fontSize: 14,
    fontFamily: FONTS.Inter_400,
    boxShadow: '0px 3.12px 31.2px 0px #5359901A',
  },
  sendButton: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeSendButton: {
    borderColor: COLORS.main,
  },
});
