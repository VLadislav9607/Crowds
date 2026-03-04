import { useRef, useState, useCallback } from 'react';
import {
  EventCreatedModalRef,
  EventCreatedModalRefProps,
} from '../../../modals';
import {
  CreatePublishedEventBodyDto,
  CreateEventDraftBodyDto,
  prefetchEventForOrgMember,
  useBucketUpload,
  useCreateEventDraft,
  useGetMe,
  useUpdateEventDraft,
} from '@actions';
import {
  showErrorToast,
  showMutationErrorToast,
  showSuccessToast,
} from '@helpers';
import { CreateEventFormData } from '../../../validation';
import { FieldErrors } from 'react-hook-form';
import { Enums } from '@services';
import { fromZonedTime } from 'date-fns-tz';
import { UseEventControllProps } from '../types';
import { Screens, useScreenNavigation } from '@navigation';
import { findOfficeByCountryCode } from '../../../helpers/officeLocationHelpers';
import { usePaymentFlow } from './usePaymentFlow';
import { PaymentConfirmationData } from '../../../modals';

export const useEventControll = ({
  formData,
  setShowFullScreenLoader,
  onScrollToErrorSection,
  createdDraftId,
  setCreatedDraftId,
}: UseEventControllProps) => {
  const { organizationMember } = useGetMe();
  const offices = organizationMember?.current_context?.offices ?? [];

  const { params } = useScreenNavigation<Screens.CreateEvent>();
  const eventCreatedModalRef = useRef<EventCreatedModalRef>(null);

  // Pending data to show EventCreatedModal after PaymentConfirmation fully closes
  const pendingEventCreatedDataRef = useRef<EventCreatedModalRefProps | null>(
    null,
  );

  // Payment flow
  const { paymentConfirmationModalRef, startPaymentFlow, processPayment } =
    usePaymentFlow();

  // Store prepared DTO between modal open and confirm
  const [pendingDto, setPendingDto] =
    useState<CreatePublishedEventBodyDto | null>(null);

  // Ref + stable wrapper so the modal always calls the latest handlePaymentConfirm
  const handlePaymentConfirmRef =
    useRef<(data: PaymentConfirmationData) => Promise<void>>(null);
  const stableHandlePaymentConfirm = useCallback(
    async (data: PaymentConfirmationData) => {
      await handlePaymentConfirmRef.current?.(data);
    },
    [],
  );

  const { mutateAsync: uploadFileMutateAsync } = useBucketUpload({
    onError: e => {
      showMutationErrorToast(e);
      setShowFullScreenLoader(false);
    },
  });

  const { mutateAsync: updateDraftMutateAsync } = useUpdateEventDraft({
    onError: e => {
      showMutationErrorToast(e);
      setShowFullScreenLoader(false);
    },
  });

  const { mutateAsync: createDraftMutateAsync } = useCreateEventDraft({
    onError: e => {
      showMutationErrorToast(e);
      setShowFullScreenLoader(false);
    },
  });

  const prepareDataToSave = async (
    values: CreateEventFormData,
  ): Promise<CreatePublishedEventBodyDto | null> => {
    let location;
    let timezone = 'UTC';

    if (values.locationType === 'entire_country') {
      location = undefined;
    } else {
      if (!values.location) {
        return null;
      }
      timezone = values.location.timezone || 'UTC';
      location = {
        ...values.location,
        coords: `POINT(${values.location.longitude} ${values.location.latitude})`,
        timezone: values.location.timezone,
      };
    }

    // Resolve officeId from country code
    let resolvedOfficeId = values.officeId;
    if (!resolvedOfficeId && values.locationCountryCode) {
      const matchedOffice = findOfficeByCountryCode(
        offices,
        values.locationCountryCode,
      );
      resolvedOfficeId = matchedOffice?.office_id;
    }
    if (!resolvedOfficeId && offices.length === 1) {
      resolvedOfficeId = offices[0].office_id;
    }
    if (!resolvedOfficeId) {
      showErrorToast('Location country does not match any of your offices');
      return null;
    }

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

    const campaignStartAt = values.campaignStartAt
      ? fromZonedTime(values.campaignStartAt, timezone).toISOString()
      : undefined;
    const campaignEndAt = values.campaignEndAt
      ? fromZonedTime(values.campaignEndAt, timezone).toISOString()
      : undefined;

    return {
      officeId: resolvedOfficeId,
      eventType: values.eventType,
      description: values.description,
      location,
      title: values.title,
      category: values.category,
      subcategoryIds: values.subcategoryIds,
      tags: values.tags,
      visibility: values.visibility as Enums<'EventVisibility'>,
      campaignStartAt,
      campaignEndAt,
      startAt: fromZonedTime(values.startAt, timezone).toISOString(),
      endAt: fromZonedTime(values.endAt, timezone).toISOString(),
      registrationClosingAt: fromZonedTime(
        values.registrationClosingAt,
        timezone,
      ).toISOString(),
      payment_mode: (values.paymentMode === 'perHour'
        ? 'per_hour'
        : 'fixed') as Enums<'EventPaymentMode'>,
      payment_amount: values.paymentAmount,
      eventBrief: values.eventBrief,
      ageGroups: values.ageGroups,
      ndaDocumentName,
      ndaDocumentPath,
    };
  };

  const addLocationErrors = (errors: FieldErrors<CreateEventFormData>) => {
    const values = formData.getValues();

    if (
      values.locationType === 'specific_location' &&
      !values.location &&
      !errors.location
    ) {
      const err = {
        type: 'custom',
        message: 'Please select a location',
      } as const;
      formData.setError('location', err);
      (errors as Record<string, unknown>).location = err;
    }
    if (
      values.locationType === 'entire_country' &&
      !values.locationCountryCode &&
      !errors.locationCountryCode
    ) {
      const err = {
        type: 'custom',
        message: 'Please select a country',
      } as const;
      formData.setError('locationCountryCode', err);
      (errors as Record<string, unknown>).locationCountryCode = err;
    }
  };

  const COMMISSION_RATE = 0.2;

  const handleCreatePublishedEvent = () => {
    formData.handleSubmit(
      async data => {
        setShowFullScreenLoader(true);

        const dto = await prepareDataToSave(data as CreateEventFormData);
        if (!dto) {
          setShowFullScreenLoader(false);
          return;
        }

        // Calculate payment summary from form data (no DB call)
        const totalHeadcount = (dto.ageGroups ?? []).reduce(
          (sum, ag) =>
            sum +
            (ag.maleCount ?? 0) +
            (ag.femaleCount ?? 0) +
            (ag.othersCount ?? 0),
          0,
        );

        if (totalHeadcount === 0) {
          showErrorToast('Please add at least one talent position.');
          setShowFullScreenLoader(false);
          return;
        }

        const paymentAmountCents = Math.round((dto.payment_amount ?? 0) * 100);
        let talentBudgetCents: number;
        let eventDurationHours: number | null = null;

        if (dto.payment_mode === 'per_hour' && dto.startAt && dto.endAt) {
          const startMs = new Date(dto.startAt).getTime();
          const endMs = new Date(dto.endAt).getTime();
          eventDurationHours = Math.max(
            (endMs - startMs) / (1000 * 60 * 60),
            0,
          );
          talentBudgetCents = Math.round(
            paymentAmountCents * totalHeadcount * eventDurationHours,
          );
        } else {
          talentBudgetCents = paymentAmountCents * totalHeadcount;
        }

        const commissionCents = Math.round(talentBudgetCents * COMMISSION_RATE);
        const totalChargeCents = talentBudgetCents + commissionCents;

        setShowFullScreenLoader(false);

        // Store DTO for later use when user confirms
        setPendingDto(dto);

        // Show payment summary modal (nothing saved to DB yet)
        paymentConfirmationModalRef.current?.open({
          eventId: params?.draftId ?? '',
          talentBudgetCents,
          commissionCents,
          totalChargeCents,
          totalHeadcount,
          eventDurationHours,
          paymentMode: dto.payment_mode ?? null,
          paymentAmountPerUnit: paymentAmountCents,
          onConfirm: stableHandlePaymentConfirm,
        });
      },
      errors => {
        addLocationErrors(errors);
        onScrollToErrorSection(errors);
        setShowFullScreenLoader(false);
      },
    )();
  };

  const handlePaymentConfirm = async (_data: PaymentConfirmationData) => {
    if (!pendingDto) return;

    try {
      // 1. Save event to DB (create draft or update existing)
      const existingDraftId = params?.draftId || createdDraftId;
      let eventId: string;

      if (existingDraftId) {
        await updateDraftMutateAsync({
          eventId: existingDraftId,
          body: pendingDto,
        });
        eventId = existingDraftId;
      } else {
        const result = await createDraftMutateAsync(
          pendingDto as CreateEventDraftBodyDto,
        );
        eventId = result.draft_id;
        setCreatedDraftId(eventId);
      }

      // 2. Create payment intent on server
      const paymentData = await startPaymentFlow(eventId);

      // 3. Process Stripe payment
      const result = await processPayment({
        eventId,
        talentBudgetCents: paymentData.talentBudgetCents,
        commissionCents: paymentData.commissionCents,
        totalChargeCents: paymentData.totalChargeCents,
        totalHeadcount: paymentData.totalHeadcount,
        eventDurationHours: paymentData.eventDurationHours,
        paymentMode: null,
        paymentAmountPerUnit: null,
        clientSecret: paymentData.clientSecret,
        paymentIntentId: paymentData.paymentIntentId,
      });

      if (result.success) {
        setPendingDto(null);

        // Prefetch event data and queue it for display after modal closes
        try {
          const eventData = await prefetchEventForOrgMember({
            event_id: eventId,
          });
          pendingEventCreatedDataRef.current = {
            event: eventData,
            isDraftPublished: true,
          };
        } catch {
          pendingEventCreatedDataRef.current = null;
        }

        paymentConfirmationModalRef.current?.close();
        showSuccessToast('Event published successfully!');
      }
    } catch {
      setShowFullScreenLoader(false);
      showErrorToast('Payment processing failed. Please try again.');
    }
  };

  // Keep ref pointing to the latest version of handlePaymentConfirm
  handlePaymentConfirmRef.current = handlePaymentConfirm;

  const onPaymentModalHide = useCallback(() => {
    const data = pendingEventCreatedDataRef.current;
    if (data) {
      pendingEventCreatedDataRef.current = null;
      eventCreatedModalRef.current?.open(data);
    }
  }, []);

  return {
    eventCreatedModalRef,
    paymentConfirmationModalRef,
    handleCreatePublishedEvent,
    onPaymentModalHide,
    organizationMember,
  };
};
