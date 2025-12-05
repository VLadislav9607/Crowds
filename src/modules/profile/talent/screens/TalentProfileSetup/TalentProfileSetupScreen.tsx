import {
  RangeSelector,
  ScreenWithScrollWrapper,
  SelectOptionField,
  SelectOptionFieldItem,
} from '@components';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { AppText } from '@ui';
import { ProfileSetupHeader } from '../../../components';
import { styles } from './styles';
import {
  ethnicityOptions,
  eyeColourOptions,
  facialAttributesOptions,
  hairColourOptions,
  tattooSpotOptions,
} from '../../../constants';
import { useState } from 'react';

export const TalentProfileSetupScreen = () => {
  const [hairColour, setHairColour] = useState<SelectOptionFieldItem>();
  const [hairStyle, setHairStyle] = useState<SelectOptionFieldItem>();
  const [facialAttributes, setFacialAttributes] = useState<
    SelectOptionFieldItem[]
  >([]);
  const [tattooSpot, setTattooSpot] = useState<SelectOptionFieldItem[]>([]);
  const [ethnicity, setEthnicity] = useState<SelectOptionFieldItem>();

  const [build, setBuild] = useState<number>(70);
  const [height, setHeight] = useState<number>(5);

  return (
    <ScreenWithScrollWrapper
      title="Setup My Profile"
      headerVariant="withTitle"
      headerStyles={{
        backgroundColor: COLORS.black,
      }}
      customElement={
        <ProfileSetupHeader
          showCircleBadge
          showUnverifiedBadge
          showCamera
          showCnBadge
          containerStyle={{ paddingHorizontal: 20 }}
        />
      }
    >
      <View style={styles.container}>
        <AppText color="black" typography="semibold_18" margin={{ bottom: 16 }}>
          Physical Details
        </AppText>

        <View style={styles.physicalDetailsContainer}>
          <SelectOptionField
            fieldProps={{
              label: 'Hair Colour',
              placeholderText: 'Pick hair colour',
              labelProps: { color: 'main' },
              value: hairColour?.label,
            }}
            options={hairColourOptions}
            selectedValues={hairColour?.value}
            onOptionSelect={setHairColour}
          />

          <SelectOptionField
            fieldProps={{
              label: 'Eye Colour',
              placeholderText: 'Pick eye colour',
              labelProps: { color: 'main' },
            }}
            options={eyeColourOptions}
            selectedValues={hairStyle?.value}
            onOptionSelect={setHairStyle}
          />

          <RangeSelector
            disableRange
            min={20}
            max={150}
            minValue={build}
            maxValue={150}
            onValueChange={low => setBuild(low)}
            label="Set Build"
            labelProps={{ color: 'main' }}
            bottonLabels={{
              minValueLabel: '20 Kg',
              maxValueLabel: '150 Kg',
            }}
            measure="Kg"
            highValueLabel={`${build} Kg`}
          />

          <RangeSelector
            min={2}
            max={8}
            minValue={height}
            maxValue={8}
            step={0.1}
            onValueChange={low => setHeight(low)}
            label="Set Height"
            labelProps={{ color: 'main' }}
            bottonLabels={{
              minValueLabel: '2 Feet',
              maxValueLabel: '8 Feet',
            }}
            measure="Ft"
            highValueLabel={`${Math.floor(height)} Foot ${Math.round(
              (height - Math.floor(height)) * 12,
            )} Inch`}
          />

          <SelectOptionField
            fieldProps={{
              label: 'Facial Attributes',
              placeholderText: 'Select facial attributes',
              labelProps: { color: 'main' },
              value: facialAttributes.map(o => o.label).join(', '),
            }}
            options={facialAttributesOptions}
            enableAutoClose={false}
            selectedValues={facialAttributes.map(o => o.value)}
            onSelectedOptionsChange={setFacialAttributes}
          />

          <SelectOptionField
            fieldProps={{
              label: 'Tattoo Spot',
              placeholderText: 'Pick tattoo spots',
              labelProps: { color: 'main' },
              value: tattooSpot.map(o => o.label).join(', '),
            }}
            options={tattooSpotOptions}
            enableAutoClose={false}
            selectedValues={tattooSpot.map(o => o.value)}
            onSelectedOptionsChange={setTattooSpot}
          />

          <SelectOptionField
            fieldProps={{
              label: 'Ethnicity',
              placeholderText: 'Select ethnicity',
              labelProps: { color: 'main' },
              value: ethnicity?.label,
            }}
            options={ethnicityOptions}
            enableAutoClose={false}
            selectedValues={ethnicity?.value}
            onOptionSelect={setEthnicity}
          />
        </View>
      </View>
    </ScreenWithScrollWrapper>
  );
};
