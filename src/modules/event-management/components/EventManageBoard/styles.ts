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
    paddingHorizontal: 12,
  },
  borderItem: {
    width: `${(100 - GAP / 2) / 2}%`,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 125,
  },
  value: {
    ...TYPOGRAPHY.bold_40,
  },
  label: {
    ...TYPOGRAPHY.bold_14,
  },
  editIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
