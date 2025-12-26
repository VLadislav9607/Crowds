import { AppImage, If, RangeSelector, SelectOptionField } from '@components';
import { View } from 'react-native';
import { AppText, AppTextarea } from '@ui';
import { styles } from './styles';
import {
  ethnicityOptions,
  eyeColourOptions,
  facialAttributesOptions,
  hairColourOptions,
  skinToneOptions,
  tattooSpotOptions,
} from '../../../constants';
import { PregnancyField, SelectSkinToneField } from '../../components';
import {
  CategoriesPicker,
  ImageSourcePickerModal,
  ImageSourcePickerModalData,
  PickedImage,
  TagsPicker,
} from '@modules/common';
import { Controller, useForm } from 'react-hook-form';
import {
  TalentProfileSetupFormData,
  TalentProfileSetupFormProps,
  TalentProfileSetupFormRef,
  talentProfileSetupSchema,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SvgXml } from 'react-native-svg';
import { ICONS, IMAGES } from '@assets';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBucketUpload, useGetMe, useUpdateTalent } from '@actions';
import { EyeColour, HairColour } from '@modules/profile';
import { showMutationErrorToast } from '@helpers';

export const TalentProfileSetupForm = forwardRef<
  TalentProfileSetupFormRef,
  TalentProfileSetupFormProps
>(({ onSuccess, onFormStateChange }, ref) => {
  const { data: me } = useGetMe();
  const {
    mutate: updateTalentMutate,
    mutateAsync: updateTalentMutateAsync,
    isPending: isUpdating,
  } = useUpdateTalent();
  const talent = me?.talent;
  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

  const { mutate: upsertTalentPhotoMutate, isPending: isUploadingPhoto } =
    useBucketUpload({
      onSuccess: async data => {
        await updateTalentMutateAsync({
          id: talent?.id!,
          data: { avatar_full_path: data.uploadedFile.path },
        });
      },
      onError: showMutationErrorToast,
    });

  // const onUploadToBucket = async (file: PickedImage) => upsertTalentPhotoMutate({ file });

  const defaultValues: TalentProfileSetupFormData = {
    hairColour: (talent?.hair_color as HairColour) ?? undefined,
    // hairStyle: undefined,
    eyeColour: (talent?.eye_color as EyeColour) ?? undefined,
    facialAttributes: undefined,
    tattooSpot: undefined,
    ethnicity: undefined,
    build: talent?.build ?? 70,
    height: talent?.height ?? 5,
    skinTone: talent?.skin_tone ?? undefined,
    isPregnant: undefined,
    months: undefined,
    categories: undefined,
    tags: undefined,
    additionalSkills: talent?.additional_skills ?? undefined,
    photo: undefined,
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TalentProfileSetupFormData>({
    resolver: zodResolver(talentProfileSetupSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const categories = watch('categories');
  const months = watch('months');

  const pickImage = () =>
    imageSourcePickerModalRef.current?.present({
      onImagePicked: (image: PickedImage) => {
        upsertTalentPhotoMutate({
          file: image,
          bucket: 'talents_full_body_photos',
        });
      },
    });

  const onUpdate = (data: TalentProfileSetupFormData) => {
    updateTalentMutate(
      {
        id: talent?.id!,
        data: {
          hair_color: data.hairColour,
          eye_color: data.eyeColour,
          build: data.build,
          height: data.height,
          // facial_attributes: data.facialAttributes,
          // tattoo_spots: data.tattooSpot,
          // ethnicity: data.ethnicity,
          // skin_tone: data.skinTone,
          // is_pregnant: data.isPregnant,
          // months: data.months,
          additional_skills: data.additionalSkills,
          // photo: data.photo?.uri,
          // categories: data.categories,
          // tags: data.tags,
        },
      },
      {
        onSuccess,
      },
    );
  };

  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit(onUpdate),
  }));

  useEffect(() => {
    onFormStateChange?.({ isUpdating: isUpdating || isUploadingPhoto });
  }, [isUpdating, isUploadingPhoto, onFormStateChange]);

  const userFullBodyPhoto = me?.talent?.avatar_full_path;

  return (
    <View style={styles.container}>
      <AppText color="black" typography="semibold_18" margin={{ bottom: 16 }}>
        Physical Details
      </AppText>

      <View style={styles.physicalDetailsContainer}>
        <Controller
          control={control}
          name="hairColour"
          render={({ field }) => (
            <SelectOptionField
              fieldProps={{
                label: 'Hair Colour',
                placeholderText: 'Pick hair colour',
                labelProps: { color: 'main' },
                value: hairColourOptions.find(o => o.value === field.value)
                  ?.label,
              }}
              options={hairColourOptions}
              selectedValues={field.value}
              onOptionSelect={item => field.onChange(item.value)}
            />
          )}
        />

        <Controller
          control={control}
          name="eyeColour"
          render={({ field }) => (
            <SelectOptionField
              fieldProps={{
                label: 'Eye Colour',
                placeholderText: 'Pick eye colour',
                labelProps: { color: 'main' },
                value: eyeColourOptions.find(o => o.value === field.value)
                  ?.label,
              }}
              options={eyeColourOptions}
              selectedValues={field.value}
              onOptionSelect={item => field.onChange(item.value)}
            />
          )}
        />

        <Controller
          control={control}
          name="build"
          render={({ field }) => (
            <RangeSelector
              disableRange
              min={20}
              max={150}
              // minValue={field.value!}
              // maxValue={150}
              defaultMinValue={field.value!}
              defaultMaxValue={150}
              onSlidingComplete={values => field.onChange(values[0])}
              label="Set Build"
              labelProps={{ color: 'main' }}
              bottomLabels={{
                minValueLabel: '20 Kg',
                maxValueLabel: '150 Kg',
              }}
              measure="Kg"
              onRenderValue={values => `${values.min} Kg`}
            />
          )}
        />

        <Controller
          control={control}
          name="height"
          render={({ field }) => (
            <RangeSelector
              min={2}
              max={8}
              defaultMinValue={field.value!}
              defaultMaxValue={8}
              step={0.1}
              onSlidingComplete={values => field.onChange(values[0])}
              label="Set Height"
              labelProps={{ color: 'main' }}
              bottomLabels={{
                minValueLabel: '2 Feet',
                maxValueLabel: '8 Feet',
              }}
              measure="Ft"
              onRenderValue={values => {
                const fractionalPart = Math.round((values.min % 1) * 10);
                return `${Math.floor(values.min)} Foot ${
                  fractionalPart ? `${fractionalPart} Inch` : ''
                }`;
              }}
              disableRange
            />
          )}
        />

        <Controller
          control={control}
          name="facialAttributes"
          render={({ field }) => (
            <SelectOptionField
              fieldProps={{
                label: 'Facial Attributes',
                placeholderText: 'Select facial attributes',
                labelProps: { color: 'main' },
                value: field.value
                  ?.map(
                    o =>
                      facialAttributesOptions.find(f => f.value === o)?.label,
                  )
                  .join(', '),
              }}
              options={facialAttributesOptions}
              enableAutoClose={false}
              selectedValues={field.value}
              onSelectedOptionsChange={item =>
                field.onChange(item.map(o => o.value))
              }
            />
          )}
        />

        <Controller
          control={control}
          name="tattooSpot"
          render={({ field }) => (
            <SelectOptionField
              fieldProps={{
                label: 'Tattoo Spot',
                placeholderText: 'Pick tattoo spots',
                labelProps: { color: 'main' },
                value: field.value
                  ?.map(o => tattooSpotOptions.find(t => t.value === o)?.label)
                  .join(', '),
              }}
              options={tattooSpotOptions}
              selectedValues={field.value}
              onSelectedOptionsChange={item =>
                field.onChange(item.map(o => o.value))
              }
            />
          )}
        />

        <Controller
          control={control}
          name="ethnicity"
          render={({ field }) => (
            <SelectOptionField
              fieldProps={{
                label: 'Ethnicity',
                placeholderText: 'Select ethnicity',
                labelProps: { color: 'main' },
                value: ethnicityOptions.find(e => e.value === field.value)
                  ?.label,
              }}
              options={ethnicityOptions}
              selectedValues={field.value}
              onOptionSelect={item => field.onChange(item.value)}
            />
          )}
        />

        <Controller
          control={control}
          name="skinTone"
          render={({ field }) => (
            <SelectSkinToneField
              fieldProps={{
                value: skinToneOptions.find(o => o.value === field.value)
                  ?.label,
              }}
              selectedValues={field.value}
              onOptionSelect={item => field.onChange(item.value)}
            />
          )}
        />

        <Controller
          control={control}
          name="isPregnant"
          render={({ field }) => (
            <PregnancyField
              isPregnant={field.value}
              setIsPregnant={value => field.onChange(value)}
              months={months}
              setMonths={value => setValue('months', value)}
              errorMessage={errors.months?.message}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="additionalSkills"
        render={({ field }) => (
          <AppTextarea
            optional
            value={field.value}
            onChange={field.onChange}
            label="Additional Skills"
            placeholder="Enter additional skills"
            containerStyle={styles.additionalSkills}
          />
        )}
      />

      <View>
        <AppImage
          bucket="talents_full_body_photos"
          imgPath={userFullBodyPhoto}
          placeholderImage={IMAGES.userWithGrayBg}
          containerStyle={styles.photoContainer}
          showSkeleton={isUploadingPhoto}
          onPress={pickImage}
          CustomElements={
            <If condition={!userFullBodyPhoto && !isUploadingPhoto}>
              <SvgXml
                xml={ICONS.manScan()}
                width={30}
                height={30}
                style={styles.manScan}
              />
              <View style={styles.cameraContainer}>
                <SvgXml xml={ICONS.camera('black')} width={15} height={15} />
              </View>
            </If>
          }
        />

        <If condition={!!errors.photo}>
          <AppText typography="medium_10" color="red" margin={{ top: 8 }}>
            {errors.photo?.message || 'One Full Length Shot'}
          </AppText>
        </If>
      </View>

      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <CategoriesPicker
            selectedCategories={field.value}
            onCategoriesChange={item => field.onChange(item)}
            containerStyle={styles.categoriesPicker}
          />
        )}
      />

      <If condition={!!categories?.length}>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagsPicker
              selectedTags={field.value}
              onTagsChange={field.onChange}
              containerStyle={styles.tagsPicker}
            />
          )}
        />
      </If>

      <ImageSourcePickerModal bottomSheetRef={imageSourcePickerModalRef} />
    </View>
  );
});

TalentProfileSetupForm.displayName = 'TalentProfileSetupForm';
