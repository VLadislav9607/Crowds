import { StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '@styles';

const GAP = 12;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: GAP,
    marginBottom: 35,
  },
  boardItem: {
    width: `${(100 - GAP / 2) / 2}%`,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 125,
  },
  boardValue: {
    ...TYPOGRAPHY.bold_40,
  },
  boardLabel: {
    ...TYPOGRAPHY.bold_14,
  },
});
