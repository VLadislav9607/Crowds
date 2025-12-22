import { Controller, useFormContext } from 'react-hook-form';

import { AppTabSelector } from '@components';
import { AppText } from '@ui';

import { CreateEventFormData } from '../../validation';

export const VisibilitySection = () => {
  const { control, watch } = useFormContext<CreateEventFormData>();

  const visibility = watch('visibility');

  return (
    <>
      <Controller
        control={control}
        name="visibility"
        render={({ field: { value, onChange } }) => (
          <AppTabSelector
            selectedValue={value}
            onSelect={onChange}
            variant="pill"
            marginBottom={-12}
            options={[
              { label: 'Public', value: 'public' },
              { label: 'Private', value: 'private' },
            ]}
          />
        )}
      />

      <AppText typography="regular_14">
        {visibility === 'private'
          ? 'Only people you invite can see and join this event.'
          : 'Anyone can see this event and apply.'}
      </AppText>
    </>
  );
};
