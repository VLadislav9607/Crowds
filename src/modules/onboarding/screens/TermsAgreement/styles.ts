import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: COLORS.white,
    lineHeight: 20,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  termsButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginVertical: 20,
  },
  termsButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: COLORS.main,
  },
  checkboxRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 24,
  },
});
