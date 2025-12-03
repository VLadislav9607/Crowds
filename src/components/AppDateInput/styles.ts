import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 4,
  },
  field: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    flexDirection: 'row',
    height: 38,
    gap: 12,
    alignItems: 'center',
  },
  placeholder: {
    height: 17,
    lineHeight: 17,
    flex:1
  },
  value: {
    height: 17,
    lineHeight: 17,
    flex:1
  },
  errorMessage: {
    marginTop: 8,
  },
});
