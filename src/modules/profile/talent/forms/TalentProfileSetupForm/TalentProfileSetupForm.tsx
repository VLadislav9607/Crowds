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
  const { talent } = useGetMe();

  const {
    control,
    setValue,
    errors,
    onSubmit,
    // Photo
    currentPhoto,
    isUploadingPhoto,
    openPhotoPicker,
    imageSourcePickerModalRef,
  } = useTalentProfileSetupForm({ onSuccess, onFormStateChange });

  useImperativeHandle(ref, () => ({ onSubmit }));

  return (
    <>
      <PhysicalDetailsSection
        control={control}
        isFemale={talent?.gender === Gender.FEMALE}
        monthsError={errors.months?.message}
        onMonthsChange={value => setValue('months', value)}
      />

      <SkillsAndCategoriesSection control={control} />

      <PhotoUploadSection
        userFullBodyPhoto={currentPhoto}
        isUploadingPhoto={isUploadingPhoto}
        errorMessage={errors.photo?.message}
        onPress={openPhotoPicker}
      />

      <ImageSourcePickerModal bottomSheetRef={imageSourcePickerModalRef} />
    </>
  );
});

TalentProfileSetupForm.displayName = 'TalentProfileSetupForm';
