import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetMe } from '@actions';
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
      bodyAttributes: Array.isArray(talent?.body_attributes)
        ? talent.body_attributes
        : undefined,
      facialAttributes: Array.isArray(talent?.facial_attributes)
        ? talent.facial_attributes
        : undefined,
      tattooSpot: Array.isArray(talent?.tattoo_spot)
        ? talent.tattoo_spot
        : undefined,
      ethnicity: (talent as any)?.ethnicity ?? undefined,
      accent: (talent as any)?.accent ?? undefined,
      build: talent?.build ?? 70,
      height: talent?.height ?? 5.8,
      skinTone: talent?.skin_tone ?? undefined,
      isPregnant: (talent as any)?.is_pregnant ?? undefined,
      months: (talent as any)?.pregnancy_months?.toString() ?? undefined,
      categories: Array.isArray((talent as any)?.categories)
        ? (talent as any).categories
        : undefined,
      subcategories: Array.isArray((talent as any)?.subcategories)
        ? (talent as any).subcategories
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
