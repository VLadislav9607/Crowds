import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light_gray3,
  },
  dayRowLast: {
    borderBottomWidth: 0,
  },
  dayName: {
    flex: 1,
  },
  selector: {
    flex: 1.8,
  },
  input: {
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F0F3F4',
    borderBottomWidth: 0,
  },
  inputValueText: {
    color: COLORS.main,
  },
  customTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light_gray3,
  },
  timeInput: {
    flex: 1,
  },
  applyButton: {
    width: 69,
    height: 44,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  applyButtonText: {
    ...TYPOGRAPHY.bold_14,
    lineHeight: 18,
    color: COLORS.white,
  },
});
