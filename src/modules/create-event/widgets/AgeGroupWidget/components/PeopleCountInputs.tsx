import { View } from 'react-native';
import { Control, Controller } from 'react-hook-form';

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
  return (
    <>
      <AppText
        typography="regular_12"
        color="black"
        style={styles.sectionTitle}
      >
        No. of people you want
      </AppText>

      <View style={styles.genderRow}>
        <View style={styles.genderInput}>
          <Controller
            control={control}
            name={`ageGroups.${index}.maleCount`}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Male"
                value={value ? String(value) : ''}
                onChangeText={text => onChange(Number(text) || 0)}
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
                value={value ? String(value) : ''}
                onChangeText={text => onChange(Number(text) || 0)}
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
                value={value ? String(value) : ''}
                onChangeText={text => onChange(Number(text) || 0)}
                keyboardType="numeric"
                placeholder="Enter"
                labelProps={inputLabelProps}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};
