import { useEffect, useRef } from 'react';
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
    savedToDraftModalRef,
    isLoadingDraft,
    isDraftEditing,
    handleCreateDraft,
  } = useDraftControll({
    formData,
    onScrollToErrorSection,
    setShowFullScreenLoader,
  });

  const { eventCreatedModalRef, handleCreatePublishedEvent } = useEventControll(
    {
      formData,
      onScrollToErrorSection,
      setShowFullScreenLoader,
    },
  );

  const handleCancel = async () => {
    actionConfirmationModalRef.current?.open({
      title: 'Cancel Event Creation',
      subtitle: 'Are you sure you want to cancel event creation?',
      onConfirm: goBack,
    });
  };

  return {
    actionConfirmationModalRef,
    formData,
    eventCreatedModalRef,
    savedToDraftModalRef,
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
    handleCreateDraft,
    handleCreatePublishedEvent,
    handleCancel,
  };
};
