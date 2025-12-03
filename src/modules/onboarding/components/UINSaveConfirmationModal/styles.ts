import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  UINContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 41,
    borderRadius: 10,
    backgroundColor: COLORS.light_purple,
    width: 218,
    gap: 6,
    marginTop: 16,
    marginBottom: 8,
  },
  yesSavedProceedButton: {
    marginTop: 16,
    marginBottom: 10,
  },
  copyUINButtonTitle: {
    color: COLORS.black,
  },
});
