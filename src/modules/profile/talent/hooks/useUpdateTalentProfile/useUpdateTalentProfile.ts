import { useBucketUpload, useGetMe, useUpdateTalent } from '@actions';
import { showMutationErrorToast } from '@helpers';
import { TalentProfileSetupFormData } from '../../forms/TalentProfileSetupForm/types';

export interface UseUpdateTalentProfileOptions {
  onSuccess?: () => void;
  onPhotoUploadSuccess?: () => void;
}

export const useUpdateTalentProfile = (
  options?: UseUpdateTalentProfileOptions,
) => {
  const { data: me } = useGetMe();
  const talentId = me?.talent?.id;

  const {
    mutate: updateTalentMutate,
    mutateAsync: updateTalentMutateAsync,
    isPending: isUpdating,
  } = useUpdateTalent();

  const { mutate: uploadPhotoMutate, isPending: isUploadingPhoto } =
    useBucketUpload({
      onSuccess: async data => {
        if (!talentId) return;
        await updateTalentMutateAsync({
          id: talentId,
          data: { avatar_full_path: data.uploadedFile.path },
        });
        options?.onPhotoUploadSuccess?.();
      },
      onError: showMutationErrorToast,
    });

  const updateProfile = (data: TalentProfileSetupFormData) => {
    console.log('data', data);
    if (!talentId) return;

    // TODO: Remove 'as any' after regenerating Supabase types
    updateTalentMutate(
      {
        id: talentId,
        data: {
          hair_color: data.hairColour,
          eye_color: data.eyeColour,
          build: data.build,
          height: data.height,
          additional_skills: data.additionalSkills,
          skin_tone: data.skinTone,
          ethnicity: data.ethnicity,
          facial_attributes: data.facialAttributes,
          tattoo_spot: data.tattooSpot,
          categories: data.categories,
          subcategories: data.subcategories,
          tags: data.tags,
          is_pregnant: data.isPregnant,
          pregnancy_months:
            data.months && data.isPregnant ? parseInt(data.months, 10) : null,
        } as any,
      },
      { onSuccess: options?.onSuccess },
    );
  };

  const uploadFullBodyPhoto = (file: {
    uri: string;
    type: string;
    name: string;
  }) => {
    uploadPhotoMutate({
      file,
      bucket: 'talents_full_body_photos',
    });
  };

  return {
    updateProfile,
    uploadFullBodyPhoto,
    isUpdating,
    isUploadingPhoto,
    isPending: isUpdating || isUploadingPhoto,
  };
};
