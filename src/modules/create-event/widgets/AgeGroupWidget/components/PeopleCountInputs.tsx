import { View } from 'react-native';
import { Control, Controller, useFormContext } from 'react-hook-form';

import { AppInput, AppText } from '@ui';

import { inputLabelProps, styles } from '../styles';
import { CreateEventFormData } from '../../../validation';

interface PeopleCountInputsProps {
  control: Control<CreateEventFormData>;
  index: number;
}

export const PeopleCountInputs = ({
  control,
  index,
}: PeopleCountInputsProps) => {
  const {
    trigger,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  const handleChange = async () => {
    // Trigger validation for this specific age group when any count field changes
    await trigger(`ageGroups.${index}`);
  };

  const errorMessage =
    errors.ageGroups?.[index]?.maleCount?.message ||
    errors.ageGroups?.[index]?.femaleCount?.message ||
    errors.ageGroups?.[index]?.othersCount?.message;

  return (
    <>
      <AppText
        typography="regular_12"
        color="black"
        style={styles.sectionTitle}
      >
        No. of people you want
      </AppText>

      <View>
        <View style={styles.genderRow}>
          <View style={styles.genderInput}>
            <Controller
              control={control}
              name={`ageGroups.${index}.maleCount`}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Male"
                  value={
                    value !== undefined && value !== null ? String(value) : ''
                  }
                  onChangeText={async text => {
                    const numValue =
                      text === '' ? undefined : Number(text) || 0;
                    onChange(numValue);
                    await handleChange();
                  }}
                  keyboardType="numeric"
                  placeholder="Enter"
                  labelProps={inputLabelProps}
                />
              )}
            />
          </View>

          <View style={styles.genderInput}>
            <Controller
              control={control}
              name={`ageGroups.${index}.femaleCount`}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Female"
                  value={
                    value !== undefined && value !== null ? String(value) : ''
                  }
                  onChangeText={async text => {
                    const numValue =
                      text === '' ? undefined : Number(text) || 0;
                    onChange(numValue);
                    await handleChange();
                  }}
                  keyboardType="numeric"
                  placeholder="Enter"
                  labelProps={inputLabelProps}
                />
              )}
            />
          </View>

          <View style={styles.genderInput}>
            <Controller
              control={control}
              name={`ageGroups.${index}.othersCount`}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Others"
                  value={
                    value !== undefined && value !== null ? String(value) : ''
                  }
                  onChangeText={async text => {
                    const numValue =
                      text === '' ? undefined : Number(text) || 0;
                    onChange(numValue);
                    await handleChange();
                  }}
                  keyboardType="numeric"
                  placeholder="Enter"
                  labelProps={inputLabelProps}
                />
              )}
            />
          </View>
        </View>
        <AppText
          renderIf={!!errorMessage}
          typography="medium_10"
          color="red"
          style={styles.errorText}
        >
          {errorMessage}
        </AppText>
      </View>
    </>
  );
};
