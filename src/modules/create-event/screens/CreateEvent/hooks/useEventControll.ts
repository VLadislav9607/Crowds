import { useRef } from 'react';
import { EventCreatedModalRef } from '../../../modals';
import {
  CreatePublishedEventBodyDto,
  prefetchEventForOrgMember,
  useBucketUpload,
  useCreatePublishedEvent,
  useGetMe,
  usePublishEventDraft,
  useUpdateEventDraft,
} from '@actions';
import { showErrorToast, showMutationErrorToast } from '@helpers';
import { CreateEventFormData } from '../../../validation';
import { FieldErrors } from 'react-hook-form';
import { Enums } from '@services';
import { fromZonedTime } from 'date-fns-tz';
import { UseEventControllProps } from '../types';
import { Screens, useScreenNavigation } from '@navigation';
import { findOfficeByCountryCode } from '../../../helpers/officeLocationHelpers';

export const useEventControll = ({
  formData,
  setShowFullScreenLoader,
  onScrollToErrorSection,
}: UseEventControllProps) => {
  const { organizationMember } = useGetMe();
  const offices = organizationMember?.current_context?.offices ?? [];

  const { params } = useScreenNavigation<Screens.CreateEvent>();
  const eventCreatedModalRef = useRef<EventCreatedModalRef>(null);

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

  const { mutateAsync: createEventMutateAsync } = useCreatePublishedEvent({
    onError: e => {
      showMutationErrorToast(e);
      setShowFullScreenLoader(false);
    },
    onSuccess: async data => {
      const eventData = await prefetchEventForOrgMember({
        event_id: data.event_id,
      });
      eventCreatedModalRef.current?.open({ event: eventData });
    },
  });

  const { mutateAsync: publishEventDraftMutateAsync } = usePublishEventDraft({
    onSuccess: async data => {
      const eventData = await prefetchEventForOrgMember({
        event_id: data.event_id,
      });
      eventCreatedModalRef.current?.open({
        event: eventData,
        isDraftPublished: !!params?.draftId,
      });
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
      visibility: values.visibility as Enums<'EventVisibility'>,
      campaignStartAt,
      campaignEndAt,
      startAt: fromZonedTime(values.startAt, timezone).toISOString(),
      endAt: fromZonedTime(values.endAt, timezone).toISOString(),
      registrationClosingAt: fromZonedTime(
        values.registrationClosingAt,
        timezone,
      ).toISOString(),
      payment_mode: values.paymentMode as Enums<'EventPaymentMode'>,
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

  const handleCreatePublishedEvent = () => {
    formData.handleSubmit(
      async data => {
        setShowFullScreenLoader(true);

        const dto = await prepareDataToSave(data as CreateEventFormData);
        if (!dto) {
          setShowFullScreenLoader(false);
          return;
        }

        if (params?.draftId) {
          await updateDraftMutateAsync({
            eventId: params.draftId,
            body: dto,
          });
          await publishEventDraftMutateAsync(params.draftId);
        } else {
          console.log('dto', dto);
          await createEventMutateAsync(dto as CreatePublishedEventBodyDto);
        }

        setShowFullScreenLoader(false);
      },
      errors => {
        addLocationErrors(errors);
        onScrollToErrorSection(errors);
        setShowFullScreenLoader(false);
      },
    )();
  };

  return {
    eventCreatedModalRef,
    handleCreatePublishedEvent,
    organizationMember,
  };
};
