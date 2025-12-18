import { useFieldArray, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppText, IconButton } from '@ui';

import { CreateEventFormData } from '../../validation';
import { AgeGroupWidget } from '../../widgets';

export const AgePeopleSection = () => {
  const { control } = useFormContext<CreateEventFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ageGroups',
  });

  const handleAddAgeGroup = () => {
    append({
      id: Math.random().toString(36).substring(2, 9),
      minAge: 18,
      maxAge: 65,
      maleCount: undefined,
      femaleCount: undefined,
      othersCount: undefined,
    });
  };

  const handleRemoveAgeGroup = (index: number) => {
    remove(index);
  };

  return (
    <>
      <View style={styles.container}>
        <AppText typography="h5_mob" margin={{ bottom: -4 }}>
          Select Age Groups & No. of People
        </AppText>

        <IconButton
          onPress={handleAddAgeGroup}
          icon={ICONS.plus()}
          iconSize={20}
          style={styles.addButton}
        />
      </View>

      {fields.length > 0 && (
        <View style={styles.widgetsContainer}>
          {fields.map((_field, index) => (
            <AgeGroupWidget
              key={index}
              control={control}
              index={index}
              onRemove={() => handleRemoveAgeGroup(index)}
            />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  widgetsContainer: {
    gap: 16,
  },
  addButton: {
    backgroundColor: COLORS.main,
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
