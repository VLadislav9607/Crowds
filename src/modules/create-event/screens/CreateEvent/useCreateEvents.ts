import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { fromZonedTime } from 'date-fns-tz';
import {
  CreateEventDraftBodyDto,
  CreatePublishedEventBodyDto,
  useBucketUpload,
  useCreateEventDraft,
  useCreatePublishedEvent,
  prefetchEventForOrgMember,
} from '@actions';
import { showMutationErrorToast } from '@helpers';
import {
  CreateEventDraftFormData,
  createEventDraftSchema,
  CreateEventFormData,
} from '../../validation';
import { useCreateEventForm } from '../../hooks';
import { EventCreatedModalRef, SavedToDraftModalRef } from '../../modals';
import { useBoolean, useFormErrorsScroll } from '@hooks';
import { ActionConfirmationModalRef } from '@modules/common';
import z, { ZodError } from 'zod';
import { Enums } from '@services';
import { goBack } from '@navigation';

export const useCreateEvents = () => {
  const { formData } = useCreateEventForm();

  const eventCreatedModalRef = useRef<EventCreatedModalRef>(null);
  const savedToDraftModalRef = useRef<SavedToDraftModalRef>(null);
  const actionConfirmationModalRef = useRef<ActionConfirmationModalRef>(null);

  const { mutateAsync: uploadFileMutateAsync } = useBucketUpload();

  // const { data, error } = useGetEventForOrgMember({
  //   event_id: '67773710-49dc-408f-8028-b2d1b22c70b6',
  // });

  // console.log('data', data?.event_age_groups);
  // console.log('error', error);

  const { mutateAsync: createEventMutateAsync } = useCreatePublishedEvent({
    onError: e => {
      showMutationErrorToast(e);
      setIsCreatingFalse();
    },
    onSuccess: async data => {
      const eventData = await prefetchEventForOrgMember({
        event_id: data.event_id,
      });
      eventCreatedModalRef.current?.open({ event: eventData });
    },
  });

  const { mutateAsync: createEventDraftMutateAsync } = useCreateEventDraft({
    onError: e => {
      showMutationErrorToast(e);
      setIsCreatingFalse();
    },
    onSuccess: () => savedToDraftModalRef.current?.open({}),
  });

  const {
    value: isCreating,
    setTrue: setIsCreatingTrue,
    setFalse: setIsCreatingFalse,
  } = useBoolean();

  // Refs for scroll view and sections
  const scrollViewRef = useRef<ScrollView | null>(null);
  const basicInfoSectionRef = useRef<View | null>(null);
  const dateTimeSectionRef = useRef<View | null>(null);
  const eventBriefSectionRef = useRef<View | null>(null);
  const visibilitySectionRef = useRef<View | null>(null);
  const agePeopleSectionRef = useRef<View | null>(null);
  const paymentSectionRef = useRef<View | null>(null);
  const otherInfoSectionRef = useRef<View | null>(null);

  const ageGroupWidgetRefs = useRef<Map<number, React.RefObject<View | null>>>(
    new Map(),
  );

  const onScrollToAgeGroupsErrorSection = (
    errors: FieldErrors<CreateEventFormData>,
  ) => {
    const ageGroupErrors = errors.ageGroups;

    if (ageGroupErrors?.message || ageGroupErrors?.root?.message) {
      return agePeopleSectionRef;
    }

    if (Array.isArray(ageGroupErrors)) {
      for (let i = 0; i < ageGroupErrors.length; i++) {
        if (ageGroupErrors[i]) {
          const widgetRef = ageGroupWidgetRefs.current.get(i);
          if (widgetRef) {
            return widgetRef;
          }
        }
      }
    } else if (typeof ageGroupErrors === 'object' && ageGroupErrors !== null) {
      for (const key in ageGroupErrors) {
        const index = parseInt(key, 10);
        if (!isNaN(index) && ageGroupErrors[key]) {
          const widgetRef = ageGroupWidgetRefs.current.get(index);
          if (widgetRef) {
            return widgetRef;
          }
        }
      }
    }

    if (ageGroupErrors) {
      return agePeopleSectionRef;
    }

    return null;
  };

  const { onScrollToErrorSection } = useFormErrorsScroll<CreateEventFormData>({
    options: {
      title: basicInfoSectionRef,
      category: basicInfoSectionRef,
      location: basicInfoSectionRef,
      startAt: dateTimeSectionRef,
      endAt: dateTimeSectionRef,
      eventBrief: eventBriefSectionRef,
      visibility: visibilitySectionRef,
      ageGroups: onScrollToAgeGroupsErrorSection,
      paymentMode: paymentSectionRef,
      paymentAmount: paymentSectionRef,
      tags: basicInfoSectionRef,
      uploadNDA: otherInfoSectionRef,
      ndaDocument: otherInfoSectionRef,
    },
    scrollViewRef,
  });

  const onProcessDraftErrors = (errors: ZodError<CreateEventFormData>) => {
    formData.clearErrors();
    const treeifyError = z.treeifyError(errors);
    const fieldErrors: FieldErrors<CreateEventFormData> = {};
    const properties = treeifyError.properties as
      | Record<string, { errors?: string[] }>
      | undefined;

    Object.entries(properties || {}).forEach(([fieldKey, fieldError]) => {
      const errorMessage = fieldError?.errors?.[0];
      if (errorMessage) {
        const error = { type: 'validation' as const, message: errorMessage };
        fieldErrors[fieldKey as keyof CreateEventFormData] = error;
        formData.setError(fieldKey as any, error);
      }
    });

    onScrollToErrorSection(fieldErrors);
  };

  const prepareDataToSave = async (
    values: CreateEventFormData | CreateEventDraftFormData | FieldValues,
  ) => {
    const typedValues = values as
      | CreateEventFormData
      | CreateEventDraftFormData;
    const timezone = typedValues.location?.timezone || 'UTC';
    const startAt = typedValues.startAt
      ? fromZonedTime(typedValues.startAt, timezone).toISOString()
      : undefined;
    const endAt = typedValues.endAt
      ? fromZonedTime(typedValues.endAt, timezone).toISOString()
      : undefined;
    const registrationClosingAt = typedValues.registrationClosingAt
      ? fromZonedTime(typedValues.registrationClosingAt, timezone).toISOString()
      : undefined;
    const payment_amount = typedValues.paymentAmount
      ? typedValues.paymentAmount
      : undefined;
    const location = typedValues.location
      ? {
          ...typedValues.location,
          coords: `POINT(${typedValues.location.longitude} ${typedValues.location.latitude})`,
          timezone: typedValues.location.timezone,
        }
      : undefined;
    const ageGroups = typedValues?.ageGroups?.length
      ? typedValues.ageGroups
      : undefined;
    const category = typedValues.category || undefined;
    const eventBrief = typedValues.eventBrief || undefined;

    let ndaDocumentName: string | undefined;
    let ndaDocumentPath: string | undefined;

    if (typedValues.ndaDocument) {
      const uploadedFile = await uploadFileMutateAsync({
        bucket: 'event_nda',
        file: typedValues.ndaDocument,
      });
      ndaDocumentName = typedValues.ndaDocument.name;
      ndaDocumentPath = uploadedFile.uploadedFile.path;
    }

    delete typedValues.ndaDocument;

    // typedValues.ageGroups?.[0]?.preferences?.
    console.log(typedValues);

    return {
      ...typedValues,
      category,
      startAt,
      endAt,
      registrationClosingAt,
      payment_mode: typedValues.paymentMode as Enums<'EventPaymentMode'>,
      payment_amount,
      eventBrief,
      location,
      ageGroups,
      ndaDocumentName,
      ndaDocumentPath,
    };
  };

  const handleCreateDraft = async () => {
    const values = formData.getValues();
    const result = createEventDraftSchema.safeParse(values);

    if (!result.success) {
      onProcessDraftErrors(result.error as ZodError<CreateEventFormData>);
      return;
    }
    formData.clearErrors();
    setIsCreatingTrue();

    const dto = await prepareDataToSave(values);

    await createEventDraftMutateAsync(dto as CreateEventDraftBodyDto);
    setIsCreatingFalse();
  };

  const handleCreatePublishedEvent = () => {
    formData.handleSubmit(
      async data => {
        setIsCreatingTrue();

        const dto = await prepareDataToSave(data);

        console.log('dto', dto);

        await createEventMutateAsync(dto as CreatePublishedEventBodyDto);

        setIsCreatingFalse();
      },
      errors => {
        onScrollToErrorSection(errors);
        setIsCreatingFalse();
      },
    )();
  };

  const handleCancel = async () => {
    actionConfirmationModalRef.current?.open({
      title: 'Cancel Event Creation',
      subtitle: 'Are you sure you want to cancel event creation?',
      onConfirm: goBack,
    });
    // const res = await prefetchEventForOrgMember({
    //   event_id: '1038bbe7-3e66-4d4c-8ddc-f86fa7973216',
    // });

    // console.log('res', res);
  };

  return {
    actionConfirmationModalRef,
    formData,
    eventCreatedModalRef,
    savedToDraftModalRef,
    scrollViewRef,
    basicInfoSectionRef,
    dateTimeSectionRef,
    eventBriefSectionRef,
    visibilitySectionRef,
    agePeopleSectionRef,
    paymentSectionRef,
    otherInfoSectionRef,
    ageGroupWidgetRefs,
    isCreating,
    handleCreateDraft,
    handleCreatePublishedEvent,
    handleCancel,
  };
};
