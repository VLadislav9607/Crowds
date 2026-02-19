import { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

import { AppTextarea } from '@ui';

import { CreateEventFormData } from '../../validation';

export const DescriptionSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <AppTextarea
            label="Description"
            labelProps={{
              typography: 'h5_mob',
              color: 'black',
              style: styles.label,
            }}
            value={value}
            onChangeText={onChange}
            errorMessage={errors.description?.message}
            placeholder="Enter event description"
            multiline
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  label: {
    marginBottom: 5,
  },
});
