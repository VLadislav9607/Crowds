import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sliderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  slider: {
    flex: 1,
    height: 17,
    justifyContent: 'center',
  },
  rail: {
    flex: 1,
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.gray,
  },
  railSelected: {
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.main,
  },
  thumb: {
    width: 12,
    height: 12,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.main,
    backgroundColor: COLORS.white,
  },
  value: {
    top: 5,
  },
  label: {
    marginBottom: 14,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    paddingHorizontal: 2,
  },
  disabled: {
    opacity: 0.3,
  },
});
