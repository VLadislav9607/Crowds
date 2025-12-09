import { Controller, FieldErrors } from 'react-hook-form';
import { SelectOptionField } from '@components';
import { CreateEventFormData } from '../../validation';

interface PreferencesSectionProps {
  control: any;
  errors: FieldErrors<CreateEventFormData>;
}

export const PreferencesSection = ({
  control,
  errors,
}: PreferencesSectionProps) => {
  return (
    <>
      <Controller
        control={control}
        name="crowdPreferences"
        render={({ field: { value, onChange } }) => (
          <SelectOptionField
            selectedValues={value}
            fieldProps={{
              value: value,
              errorMessage: errors.category?.message,
              label: 'Crowd Preferences',
              placeholderText: 'Select your preferences',
              labelProps: {
                typography: 'h5_mob',
                color: 'black',
                style: { marginBottom: 5 },
              },
            }}
            options={[
              { label: 'Crowd Preference 1', value: 'crowdPreference1' },
              { label: 'Crowd Preference 2', value: 'crowdPreference2' },
              { label: 'Crowd Preference 3', value: 'crowdPreference3' },
            ]}
            onOptionSelect={item => {
              onChange(item.value);
            }}
          />
        )}
      />
    </>
  );
};
