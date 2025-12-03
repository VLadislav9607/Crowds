import { StyleSheet } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';

import { AppInput, AppText } from '@ui';
import { CardSelector } from '@components';
import { TYPOGRAPHY } from '@styles';
import { OrganizationType } from '@modules/common';

import { SingleOrganizationFormData } from '../../hooks';

interface OrganizationNameStepProps {
  control: Control<SingleOrganizationFormData>;
  errors: FieldErrors<SingleOrganizationFormData>;
}

export const OrganizationNameStep = ({
  control,
  errors,
}: OrganizationNameStepProps) => {
  return (
    <>
      <Controller
        control={control}
        name="organizationName"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="Company/business name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.organizationName?.message}
          />
        )}
      />

      <AppText style={styles.sectionTitle}>Select your location type</AppText>

      <Controller
        control={control}
        name="organizationType"
        render={({ field: { onChange, value } }) => (
          <CardSelector
            cards={[
              {
                title:
                  'Are you signing up for an office based in a single country/region?',
                value: OrganizationType.SINGLE,
              },
              {
                title: 'Are you signing up globally?',
                subtitle:
                  '(which has multiple branches & or offices around the world in many locations)',
                value: OrganizationType.GLOBAL,
              },
            ]}
            cardStyles={styles.card}
            selectedValue={value as OrganizationType}
            onSelect={selectedValue =>
              onChange(selectedValue as OrganizationType)
            }
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 140,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: -4,
    ...TYPOGRAPHY.semibold_16,
  },
});
