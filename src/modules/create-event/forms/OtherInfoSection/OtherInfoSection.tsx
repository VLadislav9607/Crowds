import { useState } from 'react';
import { Controller, FieldErrors } from 'react-hook-form';

import { AppDateInput } from '@components';
import { AppCheckbox, AppTextarea } from '@ui';

import { CreateEventFormData } from '../../validation';

interface OtherInfoSectionProps {
  control: any;
  errors: FieldErrors<CreateEventFormData>;
}

export const OtherInfoSection = ({
  control,
  errors,
}: OtherInfoSectionProps) => {
  const [hasNDA, setHasNDA] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name="eventBrief"
        render={({ field: { value, onChange } }) => (
          <AppTextarea
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

      <AppCheckbox
        label="Do you want to upload an NDA?"
        type="checkedIcon"
        checked={hasNDA}
        onChange={setHasNDA}
      />

      <Controller
        control={control}
        name="registrationClosingDate"
        render={({ field: { value, onChange } }) => (
          <AppDateInput
            label="Registration Closing by Date"
            defaultIconPosition="right"
            labelProps={{
              typography: 'h5_mob',
              color: 'black',
              style: { marginBottom: 5 },
            }}
            value={value}
            onChange={onChange}
            errorMessage={errors.registrationClosingDate?.message}
            placeholder="Registration closing date"
          />
        )}
      />
    </>
  );
};
