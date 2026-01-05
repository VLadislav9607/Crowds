import { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { isAfter } from 'date-fns';
import { AppDateInput, DocumentPicker, If } from '@components';
import { AppCheckbox } from '@ui';
import { ICONS } from '@assets';
import { CreateEventFormData } from '../../validation';
import { styles } from './styles';

export const OtherInfoSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  const startAt = useWatch({ control, name: 'startAt' });

  const [hasNDA, setHasNDA] = useState(false);

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
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
          render={({ field: { onChange, value } }) => {
            console.log('field', value);
            return (
              <DocumentPicker
                icon={ICONS.upload('main')}
                titleIcon={ICONS.paperClip('main')}
                titleIconSize={20}
                title="Upload NDA Document Here"
                description="Do not provide your company's information in the NDA at this point."
                onDocumentSelect={onChange}
              />
            );
          }}
        />
      </If>

      <Controller
        control={control}
        name="registrationClosingAt"
        render={({ field: { value, onChange } }) => (
          <AppDateInput
            label="Closing by Date"
            description="Set the closing date for event registrations"
            defaultIconPosition="right"
            labelProps={{
              typography: 'h5_mob',
              color: 'black',
              style: styles.label,
            }}
            value={value}
            onChange={date => {
              if (startAt && isAfter(date, startAt)) {
                return;
              }
              onChange(date);
            }}
            errorMessage={errors.registrationClosingAt?.message}
            placeholder="Registration closing date"
            minimumDate={new Date()}
            maximumDate={startAt}
          />
        )}
      />
    </View>
  );
});
