import { useRef } from 'react';
import { EventCreatedModalRef } from '../../../modals';
import {
  CreatePublishedEventBodyDto,
  prefetchEventForOrgMember,
  useBucketUpload,
  useCreatePublishedEvent,
  usePublishEventDraft,
  useUpdateEventDraft,
} from '@actions';
import { showMutationErrorToast } from '@helpers';
import { CreateEventFormData } from '../../../validation';
import { Enums } from '@services';
import { fromZonedTime } from 'date-fns-tz';
import { UseEventControllProps } from '../types';
import { Screens, useScreenNavigation } from '@navigation';

export const useEventControll = ({
  formData,
  setShowFullScreenLoader,
  onScrollToErrorSection,
}: UseEventControllProps) => {
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
  ): Promise<CreatePublishedEventBodyDto> => {
    const timezone = values.location?.timezone || 'UTC';

    const location = {
      ...values.location,
      coords: `POINT(${values.location.longitude} ${values.location.latitude})`,
      timezone: values.location.timezone,
    };

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

    return {
      location,
      title: values.title,
      category: values.category,
      visibility: values.visibility as Enums<'EventVisibility'>,
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

  const handleCreatePublishedEvent = () => {
    formData.handleSubmit(
      async data => {
        setShowFullScreenLoader(true);

        const dto = await prepareDataToSave(data as CreateEventFormData);

        if (params?.draftId) {
          await updateDraftMutateAsync({
            eventId: params.draftId,
            body: dto,
          });
          await publishEventDraftMutateAsync(params.draftId);
        } else {
          await createEventMutateAsync(dto as CreatePublishedEventBodyDto);
        }

        setShowFullScreenLoader(false);
      },
      errors => {
        onScrollToErrorSection(errors);
        setShowFullScreenLoader(false);
      },
    )();
  };

  return {
    eventCreatedModalRef,
    handleCreatePublishedEvent,
  };
};
