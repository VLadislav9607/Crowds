import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { AppDateInput, DocumentPicker, If } from '@components';
import { AppCheckbox } from '@ui';
import { ICONS } from '@assets';

import { CreateEventFormData } from '../../validation';
import { styles } from './styles';

export const OtherInfoSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  const [hasNDA, setHasNDA] = useState(false);

  return (
    <>
      <AppCheckbox
        containerStyle={styles.checkboxContainer}
        label="Do you want to upload an NDA?"
        type="checkedIcon"
        checked={hasNDA}
        onChange={setHasNDA}
      />

      <If condition={hasNDA}>
        <Controller
          control={control}
          name="ndaDocument"
          render={({ field: { onChange } }) => (
            <DocumentPicker
              icon={ICONS.upload('main')}
              titleIcon={ICONS.paperClip('main')}
              titleIconSize={20}
              title="Upload NDA Document Here"
              description="Do not provide your company's information in the NDA at this point."
              onDocumentSelect={onChange}
            />
          )}
        />
      </If>

      <Controller
        control={control}
        name="registrationClosingDate"
        render={({ field: { value, onChange } }) => (
          <AppDateInput
            label="Closing by Date"
            description="Set the closing date for event registrations"
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
