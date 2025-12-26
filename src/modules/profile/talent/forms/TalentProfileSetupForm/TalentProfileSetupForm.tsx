import { forwardRef, useImperativeHandle } from 'react';
import { Gender } from '@modules/profile';
import { useGetMe } from '@actions';
import { ImageSourcePickerModal } from '@modules/common';

import {
  TalentProfileSetupFormProps,
  TalentProfileSetupFormRef,
} from './types';
import { useTalentProfileSetupForm } from '../../hooks';
import {
  PhysicalDetailsSection,
  PhotoUploadSection,
  SkillsAndCategoriesSection,
} from './sections';

export const TalentProfileSetupForm = forwardRef<
  TalentProfileSetupFormRef,
  TalentProfileSetupFormProps
>(({ onSuccess, onFormStateChange }, ref) => {
  const { me } = useGetMe();

  const {
    control,
    watch,
    setValue,
    errors,
    pickImage,
    onSubmit,
    imageSourcePickerModalRef,
  } = useTalentProfileSetupForm({ onSuccess, onFormStateChange });

  useImperativeHandle(ref, () => ({ onSubmit }));

  return (
    <>
      <PhysicalDetailsSection
        control={control}
        isFemale={me?.gender === Gender.FEMALE}
        monthsError={errors.months?.message}
        onMonthsChange={value => setValue('months', value)}
      />

      <SkillsAndCategoriesSection control={control} />

      <PhotoUploadSection
        photo={watch('photo')}
        errorMessage={errors.photo?.message}
        onPress={pickImage}
      />

      <ImageSourcePickerModal bottomSheetRef={imageSourcePickerModalRef} />
    </>
  );
});

TalentProfileSetupForm.displayName = 'TalentProfileSetupForm';
