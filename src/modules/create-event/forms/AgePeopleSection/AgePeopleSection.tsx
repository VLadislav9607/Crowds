import { forwardRef, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppText, IconButton } from '@ui';

import { CreateEventFormData } from '../../validation';
import { AgeGroupWidget } from '../../widgets';

interface AgePeopleSectionProps {
  widgetRefs?: React.RefObject<Map<number, React.RefObject<View | null>>>;
}

export const AgePeopleSection = forwardRef<View, AgePeopleSectionProps>(
  ({ widgetRefs }, ref) => {
    const {
      control,
      formState: { errors },
      clearErrors,
    } = useFormContext<CreateEventFormData>();

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'ageGroups',
    });

    // Ensure refs exist for all widgets
    useEffect(() => {
      if (widgetRefs) {
        fields.forEach((_field, index) => {
          if (!widgetRefs.current.has(index)) {
            widgetRefs.current.set(index, { current: null });
          }
        });
        // Clean up refs for removed widgets
        const currentIndices = new Set(fields.map((_, i) => i));
        const refsToRemove: number[] = [];
        widgetRefs.current.forEach((_ref, index) => {
          if (!currentIndices.has(index)) {
            refsToRemove.push(index);
          }
        });
        refsToRemove.forEach(index => widgetRefs.current.delete(index));
      }
    }, [fields, widgetRefs]);

    const handleAddAgeGroup = () => {
      if (!fields.length && errors.ageGroups?.message) {
        clearErrors('ageGroups');
      }

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
      if (widgetRefs) {
        widgetRefs.current.delete(index);
      }
    };

    return (
      <View ref={ref} collapsable={false} style={styles.wrapper}>
        <View>
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

          <AppText
            renderIf={
              !!errors.ageGroups?.message || !!errors.ageGroups?.root?.message
            }
            typography="medium_10"
            color="red"
            margin={{ top: 8 }}
          >
            {errors.ageGroups?.message || errors.ageGroups?.root?.message}
          </AppText>
        </View>

        {fields.length > 0 && (
          <View style={styles.widgetsContainer}>
            {fields.map((_field, index) => {
              // Get or create ref for this widget
              if (widgetRefs && !widgetRefs.current.has(index)) {
                widgetRefs.current.set(index, { current: null });
              }
              const widgetRef = widgetRefs?.current.get(
                index,
              ) as React.RefObject<View>;

              return (
                <AgeGroupWidget
                  key={index}
                  control={control}
                  index={index}
                  onRemove={() => handleRemoveAgeGroup(index)}
                  widgetRef={widgetRef}
                />
              );
            })}
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    gap: 24,
  },
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
