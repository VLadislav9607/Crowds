import { StyleSheet } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

import { If } from '@components';
import { TagsPicker } from '@modules/common';

import { CreateEventFormData } from '../../validation';

export const TagsSection = () => {
  const { control, watch } = useFormContext<CreateEventFormData>();

  const subcategoryId = watch('subcategoryId');

  return (
    <If condition={!!subcategoryId}>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <TagsPicker
            selectedSubcategoryIds={subcategoryId ? [subcategoryId] : []}
            tagsContainerStyle={styles.tagsPicker}
            selectedTags={field.value}
            onTagsChange={field.onChange}
          />
        )}
      />
    </If>
  );
};

const styles = StyleSheet.create({
  tagsPicker: {
    gap: 6,
  },
});
