import { useEffect, useRef, useState } from 'react';
import { useCreateEventForm } from '../../../hooks';
import { useBoolean } from '@hooks';
import { ActionConfirmationModalRef } from '@modules/common';
import { goBack, Screens, useScreenNavigation } from '@navigation';
import { useErrorsScroll } from './useErrorsScroll';
import { useDraftControll } from './useDraftControll';
import { useEventControll } from './useEventControll';

export const useCreateEventScreen = () => {
  const { formData } = useCreateEventForm();
  const { params } = useScreenNavigation<Screens.CreateEvent>();
  const [createdDraftId, setCreatedDraftId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.eventType) {
      formData.setValue('eventType', params.eventType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.eventType]);

  const actionConfirmationModalRef = useRef<ActionConfirmationModalRef>(null);

  const { value: showFullScreenLoader, setValue: setShowFullScreenLoader } =
    useBoolean();

  const {
    onScrollToErrorSection,
    scrollViewRef,
    ageGroupWidgetRefs,
    basicInfoSectionRef,
    descriptionSectionRef,
    campaignTimeSectionRef,
    dateTimeSectionRef,
    eventBriefSectionRef,
    visibilitySectionRef,
    agePeopleSectionRef,
    paymentSectionRef,
    otherInfoSectionRef,
  } = useErrorsScroll();

  const {
    isLoadingDraft,
    isDraftEditing,
    handleCreateDraft,
    handleCopyToDraft,
  } = useDraftControll({
    formData,
    onScrollToErrorSection,
    setShowFullScreenLoader,
    createdDraftId,
    setCreatedDraftId,
  });

  const {
    eventCreatedModalRef,
    paymentConfirmationModalRef,
    handleCreatePublishedEvent,
    onPaymentModalHide,
  } = useEventControll({
    formData,
    onScrollToErrorSection,
    setShowFullScreenLoader,
    createdDraftId,
    setCreatedDraftId,
  });

  const handleCancel = async () => {
    actionConfirmationModalRef.current?.open({
      title: isDraftEditing ? 'Cancel Draft Editing' : 'Cancel Event Creation',
      subtitle: isDraftEditing
        ? 'Are you sure you want to cancel draft editing?'
        : 'Are you sure you want to cancel event creation?',
      onConfirm: goBack,
    });
  };

  return {
    actionConfirmationModalRef,
    formData,
    eventCreatedModalRef,
    paymentConfirmationModalRef,
    scrollViewRef,
    basicInfoSectionRef,
    descriptionSectionRef,
    campaignTimeSectionRef,
    dateTimeSectionRef,
    eventBriefSectionRef,
    visibilitySectionRef,
    agePeopleSectionRef,
    paymentSectionRef,
    otherInfoSectionRef,
    ageGroupWidgetRefs,
    showFullScreenLoader: showFullScreenLoader || isLoadingDraft,
    isDraftEditing,
    params,
    handleCreateDraft,
    handleCreatePublishedEvent,
    handleCancel,
    handleCopyToDraft: isDraftEditing ? handleCopyToDraft : undefined,
    onPaymentModalHide,
  };
};
