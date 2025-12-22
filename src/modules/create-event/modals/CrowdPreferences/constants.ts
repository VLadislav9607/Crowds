import {
  ethnicityOptions,
  accentOptions,
  eyeColourOptions,
  hairColourOptions,
  facialAttributesOptions,
  bodyAttributesOptions,
  tattooSpotOptions,
  skinToneOptions,
} from '@modules/profile';

import { CrowdPreferences } from '../../validation';

export const CHECKBOX_CONFIGS: Array<{
  key: keyof CrowdPreferences;
  label: string;
  options: Array<{ label: string; value: string }>;
}> = [
  { key: 'ethnicity', label: 'Ethnicity', options: ethnicityOptions },
  { key: 'accent', label: 'Accent', options: accentOptions },
  { key: 'eyeColour', label: 'Eye Colour', options: eyeColourOptions },
  {
    key: 'hairColour',
    label: 'Hair Colour',
    options: hairColourOptions,
  },
  {
    key: 'facialAttributes',
    label: 'Facial Attributes',
    options: facialAttributesOptions,
  },
  {
    key: 'bodyAttributes',
    label: 'Body Attributes',
    options: bodyAttributesOptions,
  },
  {
    key: 'tattooSpot',
    label: 'Tattoo Spot',
    options: tattooSpotOptions,
  },
  { key: 'skinTone', label: 'Skin Tone', options: skinToneOptions },
];

