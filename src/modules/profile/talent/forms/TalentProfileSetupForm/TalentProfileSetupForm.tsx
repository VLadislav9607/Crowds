import { forwardRef, useImperativeHandle } from 'react';
import { Gender } from '@modules/profile';
import { useGetMe } from '@actions';
import { ImageSourcePickerModal } from '@modules/common';
import { If } from '@components';
import { AppText } from '@ui';
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
>(({ onSuccess, onFormStateChange, scrollViewRef }, ref) => {
  const { talent } = useGetMe();

  const {
    control,
    setValue,
    errors,
    photoError,
    onSubmit,
    // Photo
    currentPhoto,
    isUploadingPhoto,
    openPhotoPicker,
    imageSourcePickerModalRef,
  } = useTalentProfileSetupForm({ onSuccess, onFormStateChange, scrollViewRef });

  useImperativeHandle(ref, () => ({ onSubmit }));

  return (
    <>
      <If condition={!!photoError}>
        <AppText typography="medium_12" color="red" margin={{ bottom: 12 }}>
          {photoError}
        </AppText>
      </If>

      <AppText typography="regular_14" color="black_60" margin={{ bottom: 8 }}>
        The more details you add, the more likely you are to get booked.
      </AppText>

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
        onPress={openPhotoPicker}
      />

      <ImageSourcePickerModal bottomSheetRef={imageSourcePickerModalRef} />
    </>
  );
});

TalentProfileSetupForm.displayName = 'TalentProfileSetupForm';
