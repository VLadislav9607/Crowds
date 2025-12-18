import { Controller, useFormContext } from 'react-hook-form';

import { AppInput } from '@ui';
import { SelectOptionField } from '@components';

import { CreateEventFormData } from '../../validation';

export const BasicInfoSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Title of the event"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.title?.message}
            placeholder="Enter event title"
            labelProps={{
              typography: 'h5_mob',
              color: 'black',
              style: { marginBottom: 5 },
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <SelectOptionField
            selectedValues={value}
            fieldProps={{
              value: value,
              errorMessage: errors.category?.message,
              label: 'Category',
              placeholderText: 'Select category of event',
              labelProps: {
                typography: 'h5_mob',
                color: 'black',
                style: { marginBottom: 5 },
              },
            }}
            options={[
              { label: 'Category 1', value: 'category1' },
              { label: 'Category 2', value: 'category2' },
              { label: 'Category 3', value: 'category3' },
            ]}
            onOptionSelect={item => {
              onChange(item.value);
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Event Location"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.location?.message}
            placeholder="Enter event location"
            labelProps={{
              typography: 'h5_mob',
              color: 'black',
              style: { marginBottom: 5 },
            }}
          />
        )}
      />
    </>
  );
};
