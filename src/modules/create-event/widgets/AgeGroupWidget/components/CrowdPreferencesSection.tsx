import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { AppButton, AppText } from '@ui';
import {
  ethnicityOptions,
  accentOptions,
  eyeColourOptions,
  hairColourOptions,
  facialAttributesOptions,
  bodyAttributesOptions,
  tattooSpotOptions,
  skinToneOptions,
} from '../../../../profile';

import { styles } from '../styles';
import { CrowdPreferences } from '../../../validation';
import { If } from '@components';

type PreferenceKey = keyof CrowdPreferences;

type PreferenceType = 'array' | 'weight' | 'height';

const PREFERENCE_CONFIG: {
  key: PreferenceKey;
  label: string;
  options?: { label: string; value: string }[];
  type: PreferenceType;
}[] = [
  {
    key: 'ethnicity',
    label: 'Ethnicity',
    options: ethnicityOptions,
    type: 'array',
  },
  { key: 'accent', label: 'Accent', options: accentOptions, type: 'array' },
  { key: 'weight', label: 'Weight', type: 'weight' },
  { key: 'height', label: 'Height', type: 'height' },
  {
    key: 'eyeColour',
    label: 'Eye Colour',
    options: eyeColourOptions,
    type: 'array',
  },
  {
    key: 'hairColour',
    label: 'Hair Colour',
    options: hairColourOptions,
    type: 'array',
  },
  {
    key: 'facialAttributes',
    label: 'Facial Attributes',
    options: facialAttributesOptions,
    type: 'array',
  },
  {
    key: 'bodyAttributes',
    label: 'Body Attributes',
    options: bodyAttributesOptions,
    type: 'array',
  },
  {
    key: 'tattooSpot',
    label: 'Tattoo Spot',
    options: tattooSpotOptions,
    type: 'array',
  },
  {
    key: 'skinTone',
    label: 'Skin Tone',
    options: skinToneOptions,
    type: 'array',
  },
];

const formatWeight = (value: number) => `${value} Kg`;

const formatHeight = (value: number) => {
  const feet = Math.floor(value);
  const inches = Math.round((value % 1) * 10);
  return inches ? `${feet}'${inches}"` : `${feet}'`;
};

const getLabel = (
  value: string,
  options?: { label: string; value: string }[],
) => {
  if (!options) return value;
  const option = options.find(o => o.value === value);
  return option?.label || value;
};

interface CrowdPreferencesSectionProps {
  preferences?: CrowdPreferences;
  onRemovePreference: (key: PreferenceKey, valueToRemove?: string) => void;
  onOpenModal: () => void;
}

export const CrowdPreferencesSection = ({
  preferences,
  onRemovePreference,
  onOpenModal,
}: CrowdPreferencesSectionProps) => {
  const hasPreferences = () => {
    if (!preferences) return false;
    return PREFERENCE_CONFIG.some(config => {
      const value = preferences[config.key];
      if (config.type === 'array') {
        return Array.isArray(value) && value.length > 0;
      }
      return value !== undefined && value !== null;
    });
  };

  const renderPreferenceChips = () => {
    if (!preferences) return null;

    return PREFERENCE_CONFIG.map(config => {
      const value = preferences[config.key];

      if (config.type === 'array') {
        const arrayValue = value as string[] | undefined;
        if (!arrayValue?.length) return null;

        return (
          <View key={config.key} style={styles.preferenceCategory}>
            <AppText typography="medium_10" color="main">
              {config.label}
            </AppText>
            <View style={styles.chipsContainer}>
              {arrayValue.map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.chip}
                  onPress={() => onRemovePreference(config.key, item)}
                  activeOpacity={0.7}
                >
                  <AppText style={styles.chipText}>
                    {getLabel(item, config.options)}
                  </AppText>
                  <SvgXml
                    xml={ICONS.closeIcon('black')}
                    width={10}
                    height={10}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      } else {
        const numValue = value as number | undefined;
        if (numValue === undefined || numValue === null) return null;

        const displayValue =
          config.type === 'weight'
            ? formatWeight(numValue)
            : formatHeight(numValue);

        return (
          <View key={config.key} style={styles.preferenceCategory}>
            <AppText typography="medium_10" color="main">
              {config.label}
            </AppText>
            <View style={styles.chipsContainer}>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => onRemovePreference(config.key)}
                activeOpacity={0.7}
              >
                <AppText style={styles.chipText}>{displayValue}</AppText>
                <SvgXml xml={ICONS.closeIcon('black')} width={10} height={10} />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    });
  };

  return (
    <View style={styles.preferencesSection}>
      <View style={styles.preferencesHeader}>
        <AppText typography="bold_14" color="main">
          Crowd Preferences
        </AppText>

        <If condition={hasPreferences()}>
          <AppButton
            title="Edit preferences"
            size="31"
            width={142}
            titleStyles={styles.editPreferencesButtonText}
            onPress={onOpenModal}
          />
        </If>
      </View>

      {hasPreferences() && renderPreferenceChips()}

      <AppButton
        title="Add preferences"
        size="36"
        icon={ICONS.chats('white')}
        onPress={onOpenModal}
        wrapperStyles={styles.addPreferencesButton}
      />
    </View>
  );
};

export { PREFERENCE_CONFIG, getLabel };
export type { PreferenceKey };
