import { StyleSheet } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@styles';
import { AppTextProps } from '@ui';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
  },
  containerError: {
    borderColor: COLORS.red,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  headerContent: {
    flex: 1,
    gap: 4,
  },
  content: {
    gap: 16,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.light_gray3,
    marginHorizontal: -16,
    marginTop: 16,
  },
  ageRow: {
    flexDirection: 'row',
    gap: 16,
  },
  ageInput: {
    flex: 1,
  },
  inputLabel: {
    ...TYPOGRAPHY.regular_12,
    color: COLORS.black_50,
    marginBottom: 4,
  },
  sectionTitle: {
    marginTop: 8,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderInput: {
    flex: 1,
  },
  genderLabel: {
    marginBottom: 4,
  },
  errorText: {
    marginTop: 8,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  preferencesSection: {
    gap: 12,
  },
  preferencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceCategory: {
    gap: 8,
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray_bg,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  chipText: {
    ...TYPOGRAPHY.regular_14,
    color: COLORS.black,
  },
  chipClose: {
    padding: 2,
  },
  removeButton: {
    borderColor: COLORS.red,
  },
  removeButtonText: {
    color: COLORS.red,
  },
  addPreferencesButton: {
    marginBottom: -16,
  },
  editPreferencesButtonText: {
    ...TYPOGRAPHY.bold_14,
  },
  pregnancyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
});

export const inputLabelProps: Partial<AppTextProps> = {
  typography: 'regular_12',
  color: 'black_50',
  style: { marginBottom: 4 },
};
