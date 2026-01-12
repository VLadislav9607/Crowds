import { forwardRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { isAfter, isBefore } from 'date-fns';
import { AppDateInput, DocumentPicker, If } from '@components';
import { AppCheckbox } from '@ui';
import { ICONS } from '@assets';
import { CreateEventFormData } from '../../validation';
import { styles } from './styles';
export const OtherInfoSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  const startAt = useWatch({ control, name: 'startAt' });

  const [hasNDA, setHasNDA] = useState(false);

  const onHasNDAChange = (value: boolean) => {
    setHasNDA(value);
    if (!value) {
      setValue('ndaDocument', undefined);
      setValue('ndaDocumentName', undefined);
      setValue('ndaDocumentPath', undefined);
    }
  };

  const ndaDocumentName = useWatch({ control, name: 'ndaDocumentName' });

  // Calculate maximumDate: use startAt if it's in the future or present, otherwise use current date
  const now = new Date();
  const maximumDate = startAt && !isBefore(startAt, now) ? startAt : now;

  useEffect(() => {
    if (ndaDocumentName) {
      setHasNDA(true);
    }
  }, [ndaDocumentName]);

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <AppCheckbox
        containerStyle={styles.checkboxContainer}
        label="Do you want to upload an NDA?"
        type="checkedIcon"
        checked={hasNDA}
        onChange={onHasNDAChange}
      />

      <If condition={hasNDA}>
        <Controller
          control={control}
          name="ndaDocument"
          render={({ field: { onChange, value } }) => {
            return (
              <DocumentPicker
                icon={ICONS.upload('main')}
                titleIcon={ICONS.paperClip('main')}
                titleIconSize={20}
                selectedDocumentName={value?.name || ndaDocumentName}
                placeholder="Upload NDA Document Here"
                description="Do not provide your company's information in the NDA at this point."
                onDocumentSelect={onChange}
                onDocumentRemove={() => {
                  onChange(undefined);
                  setValue('ndaDocumentName', undefined);
                  setValue('ndaDocumentPath', undefined);
                }}
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
            mode="datetime"
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
              if (!date) {
                onChange(date);
                return;
              }
              if (isAfter(date, maximumDate)) {
                return;
              }
              onChange(date);
            }}
            errorMessage={errors.registrationClosingAt?.message}
            placeholder="Registration closing date"
            minimumDate={now}
            maximumDate={maximumDate}
          />
        )}
      />
    </View>
  );
});
