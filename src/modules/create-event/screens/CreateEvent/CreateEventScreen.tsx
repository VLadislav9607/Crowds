import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormProvider } from 'react-hook-form';

import { ScreenWithScrollWrapper } from '@components';

import { useCreateEventForm } from '../../hooks';
import {
  AgePeopleSection,
  BasicInfoSection,
  DateTimeSection,
  EventBriefSection,
  OtherInfoSection,
  PaymentSection,
  TagsSection,
  VisibilitySection,
} from '../../forms';
import { CreateEventFooter } from '../../components';
import { EventCreatedModal, SavedToDraftModal } from '../../modals';

export const CreateEventScreen = () => {
  const { formData } = useCreateEventForm();
  const [isEventCreatedModalVisible, setIsEventCreatedModalVisible] =
    useState(false);
  const [isSavedToDraftModalVisible, setIsSavedToDraftModalVisible] =
    useState(false);

  const handleSaveDraft = () => {
    // TODO: Implement save draft
    console.log('Save draft:', formData.getValues());
    setIsSavedToDraftModalVisible(true);
  };

  const handleNext = () => {
    setIsEventCreatedModalVisible(true);

    // formData.handleSubmit(
    //   data => {
    //     // TODO: Implement next step or submit
    //     console.log('Form data:', data);
    //     setIsEventCreatedModalVisible(true);
    //   },
    //   errors => {
    //     console.log('Validation errors:', errors);
    //   },
    // )();
  };

  const handleCancel = () => {
    // TODO: Navigate back or show confirmation
    console.log('Cancel');
  };

  return (
    <FormProvider {...formData}>
      <ScreenWithScrollWrapper
        headerVariant="withTitleAndImageBg"
        title="Create New Event"
        isFloatFooter={false}
        footer={
          <CreateEventFooter
            onCancel={handleCancel}
            onSaveDraft={handleSaveDraft}
            onNext={handleNext}
          />
        }
      >
        <View style={styles.container}>
          <BasicInfoSection />
          <DateTimeSection />
          <EventBriefSection />
          <VisibilitySection />
          <AgePeopleSection />
          <TagsSection />
          <PaymentSection />
          <OtherInfoSection />
        </View>

        <EventCreatedModal
          isVisible={isEventCreatedModalVisible}
          onClose={() => setIsEventCreatedModalVisible(false)}
        />
        <SavedToDraftModal
          isVisible={isSavedToDraftModalVisible}
          onClose={() => setIsSavedToDraftModalVisible(false)}
        />
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
