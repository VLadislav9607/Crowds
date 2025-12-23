import { StyleSheet } from 'react-native';

import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  rangeBackground: {
    backgroundColor: COLORS.gray_200,
    borderRadius: 8,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    gap: 12,
  },
  inputsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  input: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.black_10,
    marginTop: 24,
  },
  footerButton: {
    flex: 1,
  },
});
