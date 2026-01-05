import { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

import { AppInput } from '@ui';

import { CreateEventFormData } from '../../validation';

export const EventBriefSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <Controller
        control={control}
        name="eventBrief"
        render={({ field: { value, onChange } }) => (
          <AppInput
            label="Event Brief"
            labelProps={{
              typography: 'h5_mob',
              color: 'black',
              style: styles.label,
            }}
            value={value}
            onChangeText={onChange}
            errorMessage={errors.eventBrief?.message}
            placeholder="Provide a detailed brief of the event"
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
