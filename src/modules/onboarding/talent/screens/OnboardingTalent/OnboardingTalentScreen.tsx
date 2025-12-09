import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { styles } from './styles';
import { TalentNameForm } from '../../forms/TalentNameForm';
import { If } from '@components';
import { CreatePasswordForm } from '../../../forms';
import { useOnboardingTalentScreen } from './useOnboardingTalentScreen';
import { UINSaveConfirmationModal } from '../../../modals';
import { TalentLocationSetupForm } from '@modules/profile';

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
    setStep,
  } = useOnboardingTalentScreen();

  const titles = {
    0: "What's your name?",
    1: 'Create a password',
    2: 'Location',
  };

  return (
    <OnboardingScreenLayout
      title={titles[step as keyof typeof titles]}
      stepsCount={Object.keys(titles).length}
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

        <If condition={step === 2}>
          <TalentLocationSetupForm />
        </If>
      </View>

      <UINSaveConfirmationModal
        isVisible={isUINConfirmationModalVisible}
        onClose={toggleUINConfirmationModalVisible}
        onConfirm={() => setStep(2)}
      />
    </OnboardingScreenLayout>
  );
};
