import { View, StyleSheet } from 'react-native';
import { FormProvider } from 'react-hook-form';
import { ScreenWithScrollWrapper } from '@components';
import {
  AgePeopleSection,
  BasicInfoSection,
  CampaignTimeSection,
  DateTimeSection,
  DescriptionSection,
  EventBriefSection,
  OtherInfoSection,
  PaymentSection,
  VisibilitySection,
} from '../../forms';
import { CreateEventFooter } from '../../components';
import { EventCreatedModal, SavedToDraftModal } from '../../modals';
import { useCreateEventScreen } from './hooks/useCreateEventScreen';
import { ActionConfirmationModal } from '@modules/common';

export const CreateEventScreen = () => {
  const {
    formData,
    isDraftEditing,
    actionConfirmationModalRef,
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
    showFullScreenLoader,
    handleCreateDraft,
    handleCreatePublishedEvent,
    handleCancel,
  } = useCreateEventScreen();

  return (
    <FormProvider {...formData}>
      <ScreenWithScrollWrapper
        showLoader={showFullScreenLoader}
        headerVariant="withTitleAndImageBg"
        title={isDraftEditing ? 'Edit Draft' : 'Create New Event'}
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
          <DescriptionSection ref={descriptionSectionRef} />
          <CampaignTimeSection ref={campaignTimeSectionRef} />
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
