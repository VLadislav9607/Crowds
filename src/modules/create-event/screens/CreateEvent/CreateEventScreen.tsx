import { View, StyleSheet } from 'react-native';
import { ScreenWithScrollWrapper } from '@components';

import { useCreateEventForm } from '../../hooks';
import {
  AgePeopleSection,
  BasicInfoSection,
  CategoryTagsSection,
  DateTimeSection,
  PaymentSection,
  PreferencesSection,
} from '../../forms';
import { CreateEventFooter } from '../../components';
import { OtherInfoSection } from '../../forms/OtherInfoSection';

export const CreateEventScreen = () => {
  const { formData } = useCreateEventForm();

  const handleSaveDraft = () => {
    // TODO: Implement save draft
    console.log('Save draft:', formData.getValues());
  };

  const handleNext = () => {
    formData.handleSubmit(
      data => {
        // TODO: Implement next step or submit
        console.log('Form data:', data);
      },
      errors => {
        console.log('Validation errors:', errors);
      },
    )();
  };

  const handleCancel = () => {
    // TODO: Navigate back or show confirmation
    console.log('Cancel');
  };

  return (
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
        <BasicInfoSection
          control={formData.control}
          errors={formData.formState.errors}
        />

        <DateTimeSection
          control={formData.control}
          errors={formData.formState.errors}
        />

        <AgePeopleSection
          control={formData.control}
          errors={formData.formState.errors}
        />

        <CategoryTagsSection
          control={formData.control}
          errors={formData.formState.errors}
        />

        <PaymentSection
          control={formData.control}
          errors={formData.formState.errors}
        />

        <PreferencesSection
          control={formData.control}
          errors={formData.formState.errors}
        />

        <OtherInfoSection
          control={formData.control}
          errors={formData.formState.errors}
        />
      </View>
    </ScreenWithScrollWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 24,
  },
});
