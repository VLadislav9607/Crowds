import { useRef, useState } from 'react';
import { View } from 'react-native';
import { useWatch, useFormContext } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ICONS } from '@assets';
import { If } from '@components';
import { AppButton } from '@ui';
import { ethnicityOptions, hairColourOptions } from '../../../profile';

import { AgeGroupWidgetProps } from './types';
import { styles } from './styles';
import { CreateEventFormData, CrowdPreferences } from '../../validation';
import { CrowdPreferencesModal } from '../../modals';
import {
  AgeGroupHeader,
  AgeRangeInputs,
  PeopleCountInputs,
  CrowdPreferencesSection,
  PREFERENCE_CONFIG,
  getLabel,
  PreferenceKey,
} from './components';

export const AgeGroupWidget = ({
  control,
  index,
  onRemove,
}: AgeGroupWidgetProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const rotation = useSharedValue(180);
  const { setValue } = useFormContext<CreateEventFormData>();
  const preferencesModalRef = useRef<BottomSheetModal>(null);

  const ageGroup = useWatch({
    control,
    name: `ageGroups.${index}`,
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    rotation.value = withTiming(isExpanded ? 0 : 180, { duration: 200 });
  };

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const title = `Age ${ageGroup?.minAge || 0}-${ageGroup?.maxAge || 0}`;
  const totalPeople =
    (ageGroup?.maleCount || 0) +
    (ageGroup?.femaleCount || 0) +
    (ageGroup?.othersCount || 0);

  const preferences = ageGroup?.preferences;

  const getSummaryText = () => {
    const parts: string[] = [];

    if (totalPeople > 0) {
      parts.push(`${totalPeople} people`);
    }

    const prefParts: string[] = [];
    if (preferences?.ethnicity?.length) {
      prefParts.push(
        preferences.ethnicity
          .slice(0, 2)
          .map(v => getLabel(v, ethnicityOptions))
          .join(', '),
      );
    }
    if (preferences?.hairColour?.length) {
      prefParts.push(
        preferences.hairColour
          .slice(0, 2)
          .map(v => getLabel(v, hairColourOptions))
          .join(', '),
      );
    }

    if (prefParts.length > 0) {
      parts.push(prefParts.join(' · ') + (prefParts.length > 2 ? '...' : ''));
    }

    return parts.length > 0 ? parts.join(' · ') : 'Preferences not specified';
  };

  const handleRemovePreference = (
    key: PreferenceKey,
    valueToRemove?: string,
  ) => {
    const currentPreferences = ageGroup?.preferences || {};
    const config = PREFERENCE_CONFIG.find(c => c.key === key);

    if (config?.type === 'array') {
      const currentArray = (currentPreferences[key] as string[]) || [];
      const newArray = currentArray.filter(v => v !== valueToRemove);
      setValue(
        `ageGroups.${index}.preferences.${key}`,
        newArray.length > 0 ? newArray : undefined,
      );
    } else {
      setValue(`ageGroups.${index}.preferences.${key}`, undefined);
    }
  };

  const handleOpenPreferencesModal = () => {
    preferencesModalRef.current?.present();
  };

  const handleSavePreferences = (newPreferences: CrowdPreferences) => {
    setValue(`ageGroups.${index}.preferences`, newPreferences);
  };

  return (
    <View style={styles.container}>
      <AgeGroupHeader
        title={title}
        summaryText={getSummaryText()}
        chevronStyle={chevronStyle}
        onPress={toggleExpanded}
      />

      <If condition={isExpanded}>
        <View style={styles.content}>
          <View style={styles.separator} />

          <AgeRangeInputs control={control} index={index} />

          <PeopleCountInputs control={control} index={index} />

          <View style={styles.separator} />

          <CrowdPreferencesSection
            preferences={preferences}
            onRemovePreference={handleRemovePreference}
            onOpenModal={handleOpenPreferencesModal}
          />

          <View style={styles.separator} />

          <AppButton
            title="Remove this group"
            size="36"
            variant="withBorder"
            wrapperStyles={styles.removeButton}
            titleStyles={styles.removeButtonText}
            icon={ICONS.trash()}
            onPress={onRemove}
          />
        </View>
      </If>

      <CrowdPreferencesModal
        bottomSheetRef={preferencesModalRef}
        preferences={preferences}
        onSave={handleSavePreferences}
      />
    </View>
  );
};
