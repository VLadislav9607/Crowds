import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 22,
  },
  generateUINContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  generateIDButton: {
    width: 113,
    paddingHorizontal: 0,
  },
  UINContainer: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.light_purple,
    height: 49,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 8,
    marginBottom: 8,
  },
  UINButton: {
    width: 153,
    paddingHorizontal: 0,
  },
  generateIDButtonTitle: {
    color: COLORS.white,
  },
  formContainer: {
    paddingHorizontal: 22,
  },
});
