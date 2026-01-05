import { View } from 'react-native';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { AppInput, AppText } from '@ui';
import { inputLabelProps, styles } from '../styles';
import { CreateEventFormData } from '../../../validation';

interface AgeRangeInputsProps {
  control: Control<CreateEventFormData>;
  index: number;
}

export const AgeRangeInputs = ({ control, index }: AgeRangeInputsProps) => {
  const {
    formState: { errors },
    trigger,
  } = useFormContext<CreateEventFormData>();

  const errorMessage =
    errors.ageGroups?.[index]?.minAge?.message ||
    errors.ageGroups?.[index]?.maxAge?.message;

  return (
    <View>
      <View style={styles.ageRow}>
        <Controller
          control={control}
          name={`ageGroups.${index}.minAge`}
          render={({ field: { onChange, value } }) => (
            <AppInput
              label="Min Age Group"
              value={value ? String(value) : ''}
              onChangeText={async text => {
                onChange(Number(text) || 0);
                trigger(`ageGroups.${index}`);
              }}
              keyboardType="numeric"
              placeholder="Min Age Group"
              containerStyle={styles.ageInput}
              labelProps={inputLabelProps}
            />
          )}
        />
        <Controller
          control={control}
          name={`ageGroups.${index}.maxAge`}
          render={({ field: { onChange, value } }) => (
            <AppInput
              label="Max Age Group"
              value={value ? String(value) : ''}
              onChangeText={async text => {
                onChange(Number(text) || 0);
                trigger(`ageGroups.${index}`);
              }}
              keyboardType="numeric"
              placeholder="Max Age Group"
              containerStyle={styles.ageInput}
              labelProps={inputLabelProps}
            />
          )}
        />
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
  );
};
