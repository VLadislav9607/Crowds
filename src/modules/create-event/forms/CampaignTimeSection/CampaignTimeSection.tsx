import { forwardRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { isBefore } from 'date-fns';

import { AppText } from '@ui';
import { AppDateInput } from '@components';

import { CreateEventFormData } from '../../validation';

export const CampaignTimeSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateEventFormData>();

  const campaignStartAt = useWatch({ control, name: 'campaignStartAt' });
  const campaignEndAt = useWatch({ control, name: 'campaignEndAt' });

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <AppText typography="h5_mob" margin={{ bottom: -16 }}>
        Campaign Time
      </AppText>
      <AppText
        typography="regular_12"
        color="gray_primary"
        margin={{ bottom: -8 }}
      >
        Optional. If set, the event date & time must fall within this range.
      </AppText>

      <View style={styles.dateInputContainer}>
        <Controller
          control={control}
          name="campaignStartAt"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              placeholder="Campaign Start"
              defaultIconPosition="right"
              value={value}
              mode="datetime"
              onChange={date => {
                onChange(date);
                if (campaignEndAt && isBefore(campaignEndAt, date)) {
                  setValue('campaignEndAt', undefined as any, {
                    shouldValidate: true,
                  });
                }
              }}
              errorMessage={errors.campaignStartAt?.message}
              containerStyle={styles.dateInput}
              maximumDate={campaignEndAt ?? undefined}
              valueFormat="MM/dd/yyyy h:mm a"
            />
          )}
        />

        <Controller
          control={control}
          name="campaignEndAt"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              defaultIconPosition="right"
              placeholder="Campaign End"
              value={value}
              mode="datetime"
              onChange={date => {
                if (campaignStartAt && isBefore(date, campaignStartAt)) return;
                onChange(date);
              }}
              errorMessage={errors.campaignEndAt?.message}
              containerStyle={styles.dateInput}
              minimumDate={campaignStartAt ?? undefined}
              valueFormat="MM/dd/yyyy h:mm a"
            />
          )}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  dateInputContainer: {
    flexDirection: 'row',
    columnGap: 14,
  },
  dateInput: {
    flex: 1,
  },
});
