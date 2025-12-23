import { Controller, useFormContext } from 'react-hook-form';

import { AppInput } from '@ui';

import { CreateEventFormData } from '../../validation';

export const EventBriefSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  return (
    <Controller
      control={control}
      name="eventBrief"
      render={({ field: { value, onChange } }) => (
        <AppInput
          label="Event Brief"
          labelProps={{
            typography: 'h5_mob',
            color: 'black',
            style: { marginBottom: 5 },
          }}
          value={value}
          onChangeText={onChange}
          errorMessage={errors.eventBrief?.message}
          placeholder="Provide a detailed brief of the event"
        />
      )}
    />
  );
};
