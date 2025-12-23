import { View } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { AppInput } from '@ui';

import { inputLabelProps, styles } from '../styles';
import { CreateEventFormData } from '../../../validation';

interface AgeRangeInputsProps {
  control: Control<CreateEventFormData>;
  index: number;
}

export const AgeRangeInputs = ({ control, index }: AgeRangeInputsProps) => {
  return (
    <View style={styles.ageRow}>
      <Controller
        control={control}
        name={`ageGroups.${index}.minAge`}
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Min Age Group"
            value={value ? String(value) : ''}
            onChangeText={text => onChange(Number(text) || 0)}
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
            onChangeText={text => onChange(Number(text) || 0)}
            keyboardType="numeric"
            placeholder="Max Age Group"
            containerStyle={styles.ageInput}
            labelProps={inputLabelProps}
          />
        )}
      />
    </View>
  );
};
