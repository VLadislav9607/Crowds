import { SelectOptionField, SelectOptionFieldItem } from '@components';
import { SelectEventCategoryFieldProps } from './types';
import { useGetEventsCategories } from '@actions';
import { Database } from '@services';

export const SelectEventCategoryField = ({
  selectedCategoryId,
  onChange,
  fieldProps,
}: SelectEventCategoryFieldProps) => {
  const { data: categoriesData, isLoading } = useGetEventsCategories();

  const options = categoriesData?.categories?.map(category => ({
    label: category.title,
    value: category.id,
  }));

  const onOptionSelect = (item: SelectOptionFieldItem) => {
    onChange(
      categoriesData?.categories?.find(
        category => category.id === item.value,
      ) as Database['public']['Tables']['events_categories']['Row'],
    );
  };

  const selectedCategory = categoriesData?.categories?.find(
    category => category.id === selectedCategoryId,
  );

  return (
    <SelectOptionField
      selectedValues={selectedCategoryId}
      fieldProps={{
        value: selectedCategory?.title,
        ...fieldProps,
      }}
      showSkeleton={isLoading}
      options={options}
      onOptionSelect={onOptionSelect}
    />
  );
};
