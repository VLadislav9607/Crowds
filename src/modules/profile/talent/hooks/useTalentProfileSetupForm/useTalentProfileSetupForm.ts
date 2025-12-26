import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetMe } from '@actions';
import { Category } from '@modules/profile';
import {
  TalentProfileSetupFormData,
  TalentProfileSetupFormProps,
  talentProfileSetupSchema,
} from '../../forms/TalentProfileSetupForm/types';
import { useUpdateTalentProfile } from '../useUpdateTalentProfile';
import { useTalentPhoto } from '../useTalentPhoto';

export const useTalentProfileSetupForm = ({
  onSuccess,
  onFormStateChange,
}: Pick<TalentProfileSetupFormProps, 'onSuccess' | 'onFormStateChange'>) => {
  const { data: me } = useGetMe();
  const talent = me?.talent;

  // Profile update logic
  const { updateProfile, isUpdating } = useUpdateTalentProfile({ onSuccess });

  // Photo upload logic
  const {
    currentPhoto,
    isUploadingPhoto,
    openPhotoPicker,
    imageSourcePickerModalRef,
  } = useTalentPhoto();

  // Form default values
  // TODO: Remove 'as any' after regenerating Supabase types
  const defaultValues: any = useMemo(
    () => ({
      hairColour: talent?.hair_color ?? undefined,
      eyeColour: talent?.eye_color ?? undefined,
      facialAttributes: talent?.facial_attributes,
      tattooSpot: talent?.tattoo_spot,
      ethnicity: (talent as any)?.ethnicity ?? undefined,
      build: talent?.build ?? undefined,
      height: talent?.height ?? undefined,
      skinTone: talent?.skin_tone ?? undefined,
      isPregnant: (talent as any)?.is_pregnant ?? undefined,
      months: (talent as any)?.pregnancy_months?.toString() ?? undefined,
      categories: Array.isArray((talent as any)?.categories)
        ? ((talent as any).categories.filter((cat: string) =>
            Object.values(Category).includes(cat as Category),
          ) as Category[])
        : undefined,
      tags: Array.isArray((talent as any)?.tags)
        ? (talent as any).tags
        : undefined,
      additionalSkills: talent?.additional_skills ?? undefined,
      photo: undefined,
    }),
    [talent],
  );

  const {
    setValue,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<TalentProfileSetupFormData>({
    resolver: zodResolver(talentProfileSetupSchema),
    defaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (talent) reset(defaultValues);
  }, [talent, reset, defaultValues]);

  const onSubmit = handleSubmit(updateProfile);

  // Notify parent about loading state
  const isPending = isUpdating || isUploadingPhoto;
  useEffect(() => {
    onFormStateChange?.({ isUpdating: isPending });
  }, [isPending, onFormStateChange]);

  return {
    // Form
    control,
    setValue,
    watch,
    errors,
    onSubmit,
    // Photo
    currentPhoto,
    isUploadingPhoto,
    openPhotoPicker,
    imageSourcePickerModalRef,
  };
};
