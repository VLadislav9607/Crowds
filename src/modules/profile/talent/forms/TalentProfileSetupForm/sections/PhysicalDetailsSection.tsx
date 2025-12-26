import { View } from 'react-native';
import { Control, Controller, useWatch } from 'react-hook-form';
import { AppText } from '@ui';
import { If, RangeSelector, SelectOptionField } from '@components';
import {
  ethnicityOptions,
  eyeColourOptions,
  facialAttributesOptions,
  hairColourOptions,
  skinToneOptions,
  tattooSpotOptions,
} from '../../../../constants';
import { PregnancyField, SelectSkinToneField } from '../../../components';
import { TalentProfileSetupFormData } from '../types';
import { styles } from '../styles';

interface PhysicalDetailsSectionProps {
  control: Control<TalentProfileSetupFormData>;
  isFemale?: boolean;
  monthsError?: string;
  onMonthsChange: (value: string) => void;
}

export const PhysicalDetailsSection = ({
  control,
  isFemale,
  monthsError,
  onMonthsChange,
}: PhysicalDetailsSectionProps) => {
  const months = useWatch({ control, name: 'months' });

  return (
    <View style={styles.physicalDetailsContainer}>
      <AppText color="black" typography="semibold_18">
        Physical Details
      </AppText>

      <Controller
        control={control}
        name="hairColour"
        render={({ field }) => (
          <SelectOptionField
            fieldProps={{
              label: 'Hair Colour',
              placeholderText: 'Pick hair colour',
              labelProps: { color: 'main' },
              value: hairColourOptions.find(o => o.value === field.value)
                ?.label,
            }}
            options={hairColourOptions}
            selectedValues={field.value}
            onOptionSelect={item => field.onChange(item.value)}
          />
        )}
      />

      <Controller
        control={control}
        name="eyeColour"
        render={({ field }) => (
          <SelectOptionField
            fieldProps={{
              label: 'Eye Colour',
              placeholderText: 'Pick eye colour',
              labelProps: { color: 'main' },
              value: eyeColourOptions.find(o => o.value === field.value)?.label,
            }}
            options={eyeColourOptions}
            selectedValues={field.value}
            onOptionSelect={item => field.onChange(item.value)}
          />
        )}
      />

      <Controller
        control={control}
        name="build"
        render={({ field }) => (
          <RangeSelector
            disableRange
            min={20}
            max={150}
            defaultMinValue={field.value!}
            defaultMaxValue={150}
            onSlidingComplete={values => field.onChange(values[0])}
            label="Set Build"
            labelProps={{ color: 'main' }}
            bottomLabels={{
              minValueLabel: '20 Kg',
              maxValueLabel: '150 Kg',
            }}
            measure="Kg"
            onRenderValue={values => `${values.min} Kg`}
          />
        )}
      />

      <Controller
        control={control}
        name="height"
        render={({ field }) => (
          <RangeSelector
            min={2}
            max={8}
            defaultMinValue={field.value!}
            defaultMaxValue={8}
            step={0.1}
            onSlidingComplete={values => field.onChange(values[0])}
            label="Set Height"
            labelProps={{ color: 'main' }}
            bottomLabels={{
              minValueLabel: '2 Feet',
              maxValueLabel: '8 Feet',
            }}
            measure="Ft"
            onRenderValue={values => {
              const fractionalPart = Math.round((values.min % 1) * 10);
              return `${Math.floor(values.min)} Foot ${
                fractionalPart ? `${fractionalPart} Inch` : ''
              }`;
            }}
            disableRange
          />
        )}
      />

      <Controller
        control={control}
        name="facialAttributes"
        render={({ field }) => (
          <SelectOptionField
            fieldProps={{
              label: 'Facial Attributes',
              placeholderText: 'Select facial attributes',
              labelProps: { color: 'main' },
              value: field.value
                ?.map(
                  o => facialAttributesOptions.find(f => f.value === o)?.label,
                )
                ?.join(', '),
            }}
            options={facialAttributesOptions}
            enableAutoClose={false}
            selectedValues={field.value}
            onSelectedOptionsChange={item =>
              field.onChange(item.map(o => o.value))
            }
          />
        )}
      />

      <Controller
        control={control}
        name="tattooSpot"
        render={({ field }) => (
          <SelectOptionField
            fieldProps={{
              label: 'Tattoo Spot',
              placeholderText: 'Pick tattoo spots',
              labelProps: { color: 'main' },
              value: field.value
                ?.map(o => tattooSpotOptions.find(t => t.value === o)?.label)
                ?.join(', '),
            }}
            options={tattooSpotOptions}
            enableAutoClose={false}
            selectedValues={field.value}
            onSelectedOptionsChange={item =>
              field.onChange(item.map(o => o.value))
            }
          />
        )}
      />

      <Controller
        control={control}
        name="ethnicity"
        render={({ field }) => (
          <SelectOptionField
            fieldProps={{
              label: 'Ethnicity',
              placeholderText: 'Select ethnicity',
              labelProps: { color: 'main' },
              value: ethnicityOptions.find(e => e.value === field.value)?.label,
            }}
            options={ethnicityOptions}
            selectedValues={field.value}
            onOptionSelect={item => field.onChange(item.value)}
          />
        )}
      />

      <Controller
        control={control}
        name="skinTone"
        render={({ field }) => (
          <SelectSkinToneField
            fieldProps={{
              value: skinToneOptions.find(o => o.value === field.value)?.label,
            }}
            selectedValues={field.value}
            onOptionSelect={item => field.onChange(item.value)}
          />
        )}
      />

      <If condition={!isFemale}>
        <Controller
          control={control}
          name="isPregnant"
          render={({ field }) => (
            <PregnancyField
              isPregnant={field.value}
              setIsPregnant={field.onChange}
              months={months}
              setMonths={onMonthsChange}
              errorMessage={monthsError}
            />
          )}
        />
      </If>
    </View>
  );
};
