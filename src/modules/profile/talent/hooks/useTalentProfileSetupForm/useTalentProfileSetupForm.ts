import { useRef, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGetMe, useUpdateTalent } from '@actions';
import { ImageSourcePickerModalData, PickedImage } from '@modules/common';
import { Category } from '@modules/profile';
import {
  TalentProfileSetupFormData,
  TalentProfileSetupFormProps,
  talentProfileSetupSchema,
} from '../../forms/TalentProfileSetupForm/types';

export const useTalentProfileSetupForm = ({
  onSuccess,
  onFormStateChange,
}: Pick<TalentProfileSetupFormProps, 'onSuccess' | 'onFormStateChange'>) => {
  const { data: me } = useGetMe();
  const { mutate: updateTalentMutate, isPending: isUpdating } =
    useUpdateTalent();
  const talent = me?.talent;

  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

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

  // Sync form with talent data when it changes
  useEffect(() => {
    if (talent) reset(defaultValues);
  }, [talent, reset, defaultValues]);

  const pickImage = () =>
    imageSourcePickerModalRef.current?.present({
      onImagePicked: (image: PickedImage) => {
        setValue('photo', image);
      },
    });

  const onUpdate = (data: TalentProfileSetupFormData) => {
    // TODO: Remove 'as any' after regenerating Supabase types
    updateTalentMutate(
      {
        id: talent?.id!,
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
          tags: data.tags,
          is_pregnant: data.isPregnant,
          pregnancy_months:
            data.months && data.isPregnant ? parseInt(data.months, 10) : null,
        } as any,
      },
      { onSuccess },
    );
  };

  const onSubmit = handleSubmit(onUpdate);

  useEffect(() => {
    onFormStateChange?.({ isUpdating });
  }, [isUpdating, onFormStateChange]);

  return {
    control,
    setValue,
    watch,
    errors,
    pickImage,
    onSubmit,
    imageSourcePickerModalRef,
  };
};
