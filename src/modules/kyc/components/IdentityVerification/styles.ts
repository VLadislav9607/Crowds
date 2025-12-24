import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  stepsRow: {
    flexDirection: 'row',
  },
  stepContainer: {
    alignItems: 'center',
    gap: 8,
    width: 77,
  },
  stepNumberCircle: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.main,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedLineContainer: {
    width: 50,
    marginTop: 20,
  },
});

