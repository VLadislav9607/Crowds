import { Controller, FieldErrors } from 'react-hook-form';
import { SelectOptionField } from '@components';
import { CreateEventFormData } from '../../validation';

interface CategoryTagsSectionProps {
  control: any;
  errors: FieldErrors<CreateEventFormData>;
}

export const CategoryTagsSection = ({
  control,
  errors,
}: CategoryTagsSectionProps) => {
  return (
    <>
      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <SelectOptionField
            selectedValues={value}
            fieldProps={{
              value: value,
              errorMessage: errors.category?.message,
              label: 'Category',
              placeholderText: 'Select category of event',
              labelProps: {
                typography: 'h5_mob',
                color: 'black',
                style: { marginBottom: 5 },
              },
            }}
            options={[
              { label: 'Category 1', value: 'category1' },
              { label: 'Category 2', value: 'category2' },
              { label: 'Category 3', value: 'category3' },
            ]}
            onOptionSelect={item => {
              onChange(item.value);
            }}
          />
        )}
      />
    </>
  );
};
