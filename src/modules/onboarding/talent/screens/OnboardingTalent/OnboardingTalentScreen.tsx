import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { Alert, View } from 'react-native';
import { styles } from './styles';
import { TalentNameForm } from '../../forms/TalentNameForm';
import { If } from '@components';
import { CreatePasswordForm } from '../../../components';
import { useOnboardingTalentScreen } from './useOnboardingTalentScreen';
import { UINSaveConfirmationModal } from '../../../modals';

export const OnboardingTalentScreen = () => {
  const {
    talentNameFormRef,
    createPasswordFormRef,
    step,
    data,
    uin,
    isUINConfirmationModalVisible,
    setUIN,
    goToNextStep,
    goToPreviousStep,
    toggleUINConfirmationModalVisible,
  } = useOnboardingTalentScreen();

  return (
    <OnboardingScreenLayout
      title="What's your name?"
      stepsCount={2}
      currentStep={step}
      onBackPress={goToPreviousStep}
      onForwardPress={goToNextStep}
      headerProps={{
        headerStyles: {
          backgroundColor: COLORS.black,
        },
      }}
    >
      <View style={styles.container}>
        <If condition={!step}>
          <TalentNameForm
            ref={talentNameFormRef}
            defaultValues={data.talentNameFormData}
          />
        </If>

        <If condition={step === 1}>
          <CreatePasswordForm
            defaultValues={data.createPasswordFormData}
            ref={createPasswordFormRef}
            onGenerateUIN={() =>
              setUIN(Math.random().toString(36).substring(2, 15))
            }
            uin={uin}
          />
        </If>
      </View>

      <UINSaveConfirmationModal
        isVisible={isUINConfirmationModalVisible}
        onClose={toggleUINConfirmationModalVisible}
        onConfirm={() => Alert.alert('SUCCESS!')}
      />
    </OnboardingScreenLayout>
  );
};
