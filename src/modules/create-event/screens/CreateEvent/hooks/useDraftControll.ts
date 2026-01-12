import {
  CreateEventDraftBodyDto,
  EventForOrgMemberDto,
  UpdateDraftEventBodyDto,
  useBucketUpload,
  useCreateEventDraft,
  useGetEventForOrgMember,
  useUpdateEventDraft,
} from '@actions';
import { Screens, useScreenNavigation } from '@navigation';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { useEffect, useRef } from 'react';
import {
  CreateEventDraftFormData,
  createEventDraftSchema,
  CreateEventFormData,
} from '../../../validation';
import z, { ZodError } from 'zod';
import { FieldErrors, FieldError } from 'react-hook-form';
import { showMutationErrorToast } from '@helpers';
import { SavedToDraftModalRef } from '../../../modals';
import { Enums } from '@services';
import { UseDraftControllProps } from '../types';

export const useDraftControll = ({
  formData,
  onScrollToErrorSection,
  setShowFullScreenLoader,
}: UseDraftControllProps) => {
  const { params } = useScreenNavigation<Screens.CreateEvent>();
  const savedToDraftModalRef = useRef<SavedToDraftModalRef>(null);

  const { mutateAsync: uploadFileMutateAsync } = useBucketUpload({
    onError: e => {
      showMutationErrorToast(e);
      setShowFullScreenLoader(false);
    },
  });

  const { mutateAsync: createEventDraftMutateAsync } = useCreateEventDraft({
    onError: e => {
      showMutationErrorToast(e);
      setShowFullScreenLoader(false);
    },
    onSuccess: () => savedToDraftModalRef.current?.open({}),
  });

  const { mutateAsync: updateDraftMutateAsync } = useUpdateEventDraft({
    onError: e => {
      showMutationErrorToast(e);
      setShowFullScreenLoader(false);
    },
    onSuccess: () => savedToDraftModalRef.current?.open({}),
  });

  const { data: draftData, isLoading: isLoadingDraft } =
    useGetEventForOrgMember({ event_id: params?.draftId || '' });

  const mapDraftDataToFormData = (
    eventData: EventForOrgMemberDto,
  ): Partial<CreateEventFormData> => {
    const timezone = eventData.event_location?.timezone || 'UTC';

    const parseCoords = (coords: unknown): string | undefined => {
      if (typeof coords === 'string' && coords.startsWith('POINT(')) {
        return coords;
      }
      return undefined;
    };

    const parseDate = (
      dateString: string | null | undefined,
    ): Date | undefined => {
      if (!dateString) return undefined;
      try {
        const utcDate = new Date(dateString);
        return toZonedTime(utcDate, timezone);
      } catch {
        return undefined;
      }
    };

    const mapPreferences = (
      prefs: EventForOrgMemberDto['event_age_groups'][0]['preferences'],
    ) => {
      if (!prefs) return undefined;

      return {
        ethnicity:
          prefs.ethnicities?.map(
            item => (item as any).value || (item as any).id,
          ) || undefined,
        accent: prefs.accents?.map(item => item.value) || undefined,
        eyeColour: prefs.eye_colors?.map(item => item.value) || undefined,
        hairColour: prefs.hair_colors?.map(item => item.value) || undefined,
        facialAttributes:
          prefs.facial_attributes?.map(item => item.value) || undefined,
        bodyAttributes:
          prefs.body_attributes?.map(item => item.value) || undefined,
        tattooSpot: prefs.tattoo_spots?.map(item => item.value) || undefined,
        skinTone: prefs.skin_tones?.map(item => item.value) || undefined,
        minWeight: prefs.weight_min ?? undefined,
        maxWeight: prefs.weight_max ?? undefined,
        minHeight: prefs.height_min ?? undefined,
        maxHeight: prefs.height_max ?? undefined,
        isPregnant: prefs.pregnancy_allowed ?? undefined,
        months: prefs.pregnancy_months ?? undefined,
        additionalThings: prefs.additional_notes
          ? prefs.additional_notes
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
          : undefined,
      };
    };

    const ageGroups =
      eventData.event_age_groups?.map(ageGroup => ({
        id: ageGroup.id,
        minAge: ageGroup.min_age,
        maxAge: ageGroup.max_age,
        maleCount: ageGroup.male_count ?? undefined,
        femaleCount: ageGroup.female_count ?? undefined,
        othersCount: ageGroup.other_count ?? undefined,
        preferences: mapPreferences(ageGroup.preferences),
      })) || [];

    const location = eventData.event_location
      ? {
          autocomplete_description:
            eventData.event_location.autocomplete_description,
          city: eventData.event_location.city,
          coords: parseCoords(eventData.event_location.coords) || '',
          country: eventData.event_location.country,
          formatted_address: eventData.event_location.formatted_address,
          latitude: eventData.event_location.latitude,
          longitude: eventData.event_location.longitude,
          place_id: eventData.event_location.place_id,
          postal_code: eventData.event_location.postal_code ?? undefined,
          region: eventData.event_location.region,
          street_name: eventData.event_location.street_name ?? undefined,
          street_number: eventData.event_location.street_number ?? undefined,
          timezone: eventData.event_location.timezone,
        }
      : undefined;

    return {
      title: eventData.title || '',
      location: location,
      visibility: (eventData.visibility as 'public' | 'private') || 'public',
      startAt: parseDate(eventData.start_at),
      endAt: parseDate(eventData.end_at),
      ageGroups: ageGroups,
      category: eventData.category_id || '',
      tags: undefined, // Tags might be in a separate table, skip for now
      paymentMode: (eventData.payment_mode === 'per_hour'
        ? 'perHour'
        : eventData.payment_mode === 'fixed'
        ? 'fixed'
        : 'perHour') as 'perHour' | 'fixed',
      // Якщо payment_amount є 0 або null - передаємо undefined
      paymentAmount:
        eventData.payment_amount && eventData.payment_amount > 0
          ? eventData.payment_amount
          : undefined,
      eventBrief: eventData.brief || '',
      ndaDocumentName: eventData.nda_file_name || '',
      ndaDocumentPath: eventData.nda_file_path || '',
      // ndaDocument: eventData.nda_file_name || "",
      registrationClosingAt: parseDate(eventData.registration_closes_at),
    };
  };

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
        const error: FieldError = {
          type: 'validate',
          message: errorMessage,
        };
        const typedFieldKey = fieldKey as keyof CreateEventFormData;
        (fieldErrors as Record<string, FieldError>)[typedFieldKey] = error;
        formData.setError(typedFieldKey, error);
      }
    });

    onScrollToErrorSection(fieldErrors);
  };

  const prepareDraftDataToSave = async (
    values: CreateEventDraftFormData,
  ): Promise<CreateEventDraftBodyDto> => {
    const timezone = values.location?.timezone || 'UTC';
    const startAt = values.startAt
      ? fromZonedTime(values.startAt, timezone).toISOString()
      : undefined;
    const endAt = values.endAt
      ? fromZonedTime(values.endAt, timezone).toISOString()
      : undefined;
    const registrationClosingAt = values.registrationClosingAt
      ? fromZonedTime(values.registrationClosingAt, timezone).toISOString()
      : undefined;
    // Якщо paymentAmount є 0 або не встановлено - передаємо undefined
    const payment_amount =
      values.paymentAmount && values.paymentAmount > 0
        ? values.paymentAmount
        : undefined;
    // Якщо location є null або не має обов'язкового поля country - передаємо undefined
    // Для оновлення undefined буде конвертовано в null для видалення локації
    const location =
      values.location &&
      values.location.country &&
      values.location.country.trim() !== ''
        ? {
            ...values.location,
            coords: `POINT(${values.location.longitude} ${values.location.latitude})`,
            timezone: values.location.timezone,
          }
        : undefined;
    const ageGroups = values?.ageGroups?.length ? values.ageGroups : undefined;
    const category = values.category || undefined;
    const eventBrief = values.eventBrief || undefined;

    let ndaDocumentName: string | undefined;
    let ndaDocumentPath: string | undefined;

    if (values.ndaDocument) {
      const uploadedFile = await uploadFileMutateAsync({
        bucket: 'event_nda',
        file: values.ndaDocument,
      });
      ndaDocumentName = values.ndaDocument.name;
      ndaDocumentPath = uploadedFile.uploadedFile.path;
    } else if (values.ndaDocumentName && values.ndaDocumentPath) {
      ndaDocumentName = values.ndaDocumentName;
      ndaDocumentPath = values.ndaDocumentPath;
    }

    delete values.ndaDocument;

    const visibility =
      values.visibility === null ? undefined : values.visibility;

    return {
      title: values.title,
      category,
      visibility: visibility as Enums<'EventVisibility'> | undefined,
      startAt,
      endAt,
      registrationClosingAt,
      payment_mode: values.paymentMode as Enums<'EventPaymentMode'>,
      payment_amount,
      eventBrief,
      location,
      ageGroups,
      ndaDocumentName,
      ndaDocumentPath,
    };
  };

  const handleUpdateDraft = async () => {
    if (!params?.draftId) {
      return;
    }
    const values = formData.getValues();
    const result = createEventDraftSchema.safeParse(values);

    if (!result.success) {
      onProcessDraftErrors(result.error as ZodError<CreateEventFormData>);
      return;
    }
    formData.clearErrors();
    setShowFullScreenLoader(true);

    try {
      const dto = await prepareDraftDataToSave(values);

      // Convert undefined values to null so database can delete these fields
      const body: UpdateDraftEventBodyDto = Object.fromEntries(
        Object.entries(dto).map(([key, value]) => [
          key,
          value === undefined ? null : value,
        ]),
      ) as UpdateDraftEventBodyDto;

      await updateDraftMutateAsync({
        eventId: params.draftId,
        body,
      });
    } catch (error) {
      // Помилка вже оброблена в prepareDraftDataToSave або в мутаціях
      console.error('Error updating draft:', error);
    } finally {
      setShowFullScreenLoader(false);
    }
  };

  const handleCreateDraft = async () => {
    if (params?.draftId) {
      handleUpdateDraft();
      return;
    }
    const values = formData.getValues();
    const result = createEventDraftSchema.safeParse(values);

    if (!result.success) {
      onProcessDraftErrors(result.error as ZodError<CreateEventFormData>);
      return;
    }
    formData.clearErrors();
    setShowFullScreenLoader(true);

    try {
      const dto = await prepareDraftDataToSave(values);

      await createEventDraftMutateAsync(dto as CreateEventDraftBodyDto);
    } catch (error) {
      // Помилка вже оброблена в prepareDraftDataToSave або в мутаціях
      console.error('Error creating draft:', error);
    } finally {
      setShowFullScreenLoader(false);
    }
  };

  useEffect(() => {
    if (draftData && !isLoadingDraft) {
      const mappedData = mapDraftDataToFormData(draftData);
      formData.reset(mappedData as CreateEventFormData);
    }
  }, [draftData, isLoadingDraft, formData]);

  return {
    isLoadingDraft,
    savedToDraftModalRef,
    isDraftEditing: !!params?.draftId,
    handleCreateDraft,
  };
};
