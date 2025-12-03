import { OnboardingScreenLayout } from '../../layouts';
import { COLORS } from '@styles';
import { useCreatePasswordScreen } from './useCreatePasswordScreen';
import { CreatePasswordForm, UINSaveConfirmationModal } from '../../components';
import { styles } from './styles';

export const CreatePasswordScreen = () => {
  const {
    isUINSaveConfirmationModalVisible,
    onSubmit,
    handleSubmit,
    toggleUINSaveConfirmationModalVisible,
  } = useCreatePasswordScreen();

  return (
    <OnboardingScreenLayout
      title="Create Password"
      stepsCount={2}
      currentStep={0}
      onBackPress={() => {}}
      onForwardPress={handleSubmit(onSubmit)}
      headerProps={{
        headerStyles: {
          backgroundColor: COLORS.black,
        },
      }}
    >
      <CreatePasswordForm containerStyle={styles.formContainer} />

      <UINSaveConfirmationModal
        isVisible={isUINSaveConfirmationModalVisible}
        onClose={toggleUINSaveConfirmationModalVisible}
      />
    </OnboardingScreenLayout>
  );
};
