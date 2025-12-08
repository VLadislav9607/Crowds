import { Controller, FieldErrors } from 'react-hook-form';
import { AppInput } from '@ui';

import { CreateEventFormData } from '../../validation';

interface BasicInfoSectionProps {
  control: any;
  errors: FieldErrors<CreateEventFormData>;
}

export const BasicInfoSection = ({
  control,
  errors,
}: BasicInfoSectionProps) => {
  return (
    <>
      <Controller
        control={control}
        name="companyName"
        render={({ field: { value } }) => (
          <AppInput
            label="Company Name"
            placeholder="City of Yarra"
            value={value}
            editable={false}
            errorMessage={errors.companyName?.message}
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
