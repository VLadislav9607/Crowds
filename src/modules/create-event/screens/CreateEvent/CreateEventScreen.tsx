import { View, StyleSheet } from 'react-native';
import { FormProvider } from 'react-hook-form';
import { ScreenWithScrollWrapper } from '@components';
import {
  AgePeopleSection,
  BasicInfoSection,
  DateTimeSection,
  EventBriefSection,
  OtherInfoSection,
  PaymentSection,
  VisibilitySection,
} from '../../forms';
import { CreateEventFooter } from '../../components';
import { EventCreatedModal, SavedToDraftModal } from '../../modals';
import { useCreateEvents } from './useCreateEvents';
import { ActionConfirmationModal } from '@modules/common';

export const CreateEventScreen = () => {
  const {
    formData,
    actionConfirmationModalRef,
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
  } = useCreateEvents();

  return (
    <FormProvider {...formData}>
      <ScreenWithScrollWrapper
        showLoader={isCreating}
        headerVariant="withTitleAndImageBg"
        title="Create New Event"
        isFloatFooter={false}
        goBackCallback={handleCancel}
        scrollViewRef={scrollViewRef}
        footer={
          <CreateEventFooter
            onCancel={handleCancel}
            onSaveDraft={handleCreateDraft}
            onNext={handleCreatePublishedEvent}
          />
        }
      >
        <View style={styles.container}>
          <BasicInfoSection ref={basicInfoSectionRef} />
          <DateTimeSection ref={dateTimeSectionRef} />
          <EventBriefSection ref={eventBriefSectionRef} />
          <VisibilitySection ref={visibilitySectionRef} />
          <AgePeopleSection
            ref={agePeopleSectionRef}
            widgetRefs={ageGroupWidgetRefs}
          />
          {/* <TagsSection /> */}
          <PaymentSection ref={paymentSectionRef} />
          <OtherInfoSection ref={otherInfoSectionRef} />
        </View>

        <ActionConfirmationModal ref={actionConfirmationModalRef} />
        <EventCreatedModal ref={eventCreatedModalRef} />
        <SavedToDraftModal ref={savedToDraftModalRef} />
      </ScreenWithScrollWrapper>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 24,
  },
});
