import { Control, Controller, useWatch } from 'react-hook-form';
import { AppTextarea } from '@ui';
import { If } from '@components';
import { CategoriesPicker, TagsPicker } from '@modules/common';
import { Category, filterTagsByCategories, TagValue } from '@modules/profile';

import { TalentProfileSetupFormData } from '../types';
import { styles } from '../styles';

interface SkillsAndCategoriesSectionProps {
  control: Control<TalentProfileSetupFormData>;
}

export const SkillsAndCategoriesSection = ({
  control,
}: SkillsAndCategoriesSectionProps) => {
  const categories = useWatch({ control, name: 'categories' }) || [];

  return (
    <>
      <Controller
        control={control}
        name="additionalSkills"
        render={({ field }) => (
          <AppTextarea
            optional
            value={field.value}
            onChangeText={field.onChange}
            label="Additional Skills"
            placeholder="Enter additional skills"
            containerStyle={styles.additionalSkills}
          />
        )}
      />

      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <CategoriesPicker
            selectedCategories={field.value}
            onCategoriesChange={item => field.onChange(item)}
            containerStyle={styles.categoriesPicker}
          />
        )}
      />

      <If condition={categories.length > 0}>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagsPicker
              selectedCategories={categories as Category[]}
              selectedTags={field.value as TagValue[]}
              onTagsChange={newTags => {
                const validTags = filterTagsByCategories(
                  newTags,
                  categories as Category[],
                );
                field.onChange(validTags);
              }}
              containerStyle={styles.tagsPicker}
            />
          )}
        />
      </If>
    </>
  );
};
