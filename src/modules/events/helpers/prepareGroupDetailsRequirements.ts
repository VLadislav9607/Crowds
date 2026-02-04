import {
  accentOptions,
  bodyAttributesOptions,
  ethnicityOptions,
  eyeColourOptions,
  facialAttributesOptions,
  hairColourOptions,
  skinToneOptions,
  tattooSpotOptions,
} from '@modules/profile';
import { EventDetailsRequirementItem } from '../components';
import { EventAgeGroupDto } from '@actions';

export const prepareGroupDetailsRequirements = (
  group: EventAgeGroupDto,
): {
  mainOptions: EventDetailsRequirementItem[];
  preferencesOptions: EventDetailsRequirementItem[];
  allOptions: EventDetailsRequirementItem[];
} => {
  const genderOptions = [];
  if (!!group.male_count) genderOptions.push(`${group.male_count} Male`);
  if (!!group.female_count) {
    genderOptions.push(`${group.female_count} Female`);
  }
  if (!!group.other_count) genderOptions.push(`${group.other_count} Others`);

  const isPreferencesPresent = !!group?.preferences;

  const ethnicityOptionsList = isPreferencesPresent
    ? ethnicityOptions
        .filter(item =>
          group.preferences?.ethnicities?.some(
            ethnicity => ethnicity.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];
  const accentOptionsList = isPreferencesPresent
    ? accentOptions
        .filter(item =>
          group.preferences?.accents?.some(
            accent => accent.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];
  const eyeColorOptionsList = isPreferencesPresent
    ? eyeColourOptions
        .filter(item =>
          group.preferences?.eye_colors?.some(
            eyeColor => eyeColor.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];
  const hairColourOptionsList = isPreferencesPresent
    ? hairColourOptions
        .filter(item =>
          group.preferences?.hair_colors?.some(
            hairColor => hairColor.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];
  const facialAttributesOptionsList = isPreferencesPresent
    ? facialAttributesOptions
        .filter(item =>
          group.preferences?.facial_attributes?.some(
            facialAttribute => facialAttribute.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];
  const bodyAttributesOptionsList = isPreferencesPresent
    ? bodyAttributesOptions
        .filter(item =>
          group.preferences?.body_attributes?.some(
            bodyAttribute => bodyAttribute.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];
  const tattooSpotOptionsList = isPreferencesPresent
    ? tattooSpotOptions
        .filter(item =>
          group.preferences?.tattoo_spots?.some(
            tattooSpot => tattooSpot.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];
  const skinToneOptionsList = isPreferencesPresent
    ? skinToneOptions
        .filter(item =>
          group.preferences?.skin_tones?.some(
            skinTone => skinTone.value === item.value,
          ),
        )
        .map(item => item.label) ?? []
    : [];

  const mainOptions = [
    {
      title: 'Gender',
      options: genderOptions,
    },
    {
      title: 'Age Group',
      options: [`${group.min_age} - ${group.max_age} years`],
    },
  ];

  const additionalNotesOptions = isPreferencesPresent
    ? group.preferences?.additional_notes
        ?.split(',')
        .map(thing => thing.trim()) ?? []
    : [];

  const preferencesOptions = [
    {
      title: 'Ethnicity',
      options: ethnicityOptionsList,
      invisible: !ethnicityOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Accent',
      options: accentOptionsList,
      invisible: !accentOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Eye Color',
      options: eyeColorOptionsList,
      invisible: !eyeColorOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Hair Colour',
      options: hairColourOptionsList,
      invisible: !hairColourOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Facial Attributes',
      options: facialAttributesOptionsList,
      invisible: !facialAttributesOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Body Attributes',
      options: bodyAttributesOptionsList,
      invisible: !bodyAttributesOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Tattoo Spot',
      options: tattooSpotOptionsList,
      invisible: !tattooSpotOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Skin Tone',
      options: skinToneOptionsList,
      invisible: !skinToneOptionsList.length,
      useRowLayout: true,
    },
    {
      title: 'Pregnancy',
      options: isPreferencesPresent
        ? group.preferences?.pregnancy_allowed
          ? [`Required: ${group.preferences.pregnancy_months} months`]
          : ['Not Allowed']
        : [],
      invisible: typeof group?.preferences?.pregnancy_allowed !== 'boolean',
    },
    {
      title: 'Additional Notes',
      options: additionalNotesOptions,
      invisible: !additionalNotesOptions.length,
      useRowLayout: true,
    },
    {
      title: 'Weight',
      options: [
        `${group.preferences?.weight_min} - ${group.preferences?.weight_max} kg`,
      ],
      invisible:
        !group.preferences?.weight_min || !group.preferences?.weight_max,
      useRowLayout: true,
    },
    {
      title: 'Height',
      options: [
        `${group.preferences?.height_min} - ${group.preferences?.height_max} Inches`,
      ],
      invisible:
        !group.preferences?.height_min || !group.preferences?.height_max,
      useRowLayout: true,
    },
  ];

  const allOptions = [...mainOptions, ...preferencesOptions];

  return {
    mainOptions,
    preferencesOptions,
    allOptions,
  };
};
