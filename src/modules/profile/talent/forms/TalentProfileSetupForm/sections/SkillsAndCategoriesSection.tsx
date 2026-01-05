import { Control, Controller, useWatch } from 'react-hook-form';
import { AppTextarea } from '@ui';
import { If } from '@components';
import {
  CategoriesPicker,
  SubcategoriesPicker,
  TagsPicker,
} from '@modules/common';

import { TalentProfileSetupFormData } from '../types';
import { styles } from '../styles';

interface SkillsAndCategoriesSectionProps {
  control: Control<TalentProfileSetupFormData>;
}

export const SkillsAndCategoriesSection = ({
  control,
}: SkillsAndCategoriesSectionProps) => {
  const categories = useWatch({ control, name: 'categories' }) || [];
  const subcategories = useWatch({ control, name: 'subcategories' }) || [];

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
            onCategoriesChange={field.onChange}
            containerStyle={styles.categoriesPicker}
          />
        )}
      />

      <If condition={categories.length > 0}>
        <Controller
          control={control}
          name="subcategories"
          render={({ field }) => (
            <SubcategoriesPicker
              selectedCategoryIds={categories}
              selectedSubcategories={field.value}
              onSubcategoriesChange={field.onChange}
              containerStyle={styles.subcategoriesPicker}
            />
          )}
        />
      </If>

      <If condition={subcategories.length > 0}>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagsPicker
              selectedSubcategoryIds={subcategories}
              selectedTags={field.value}
              onTagsChange={field.onChange}
              containerStyle={styles.tagsPicker}
            />
          )}
        />
      </If>
    </>
  );
};
