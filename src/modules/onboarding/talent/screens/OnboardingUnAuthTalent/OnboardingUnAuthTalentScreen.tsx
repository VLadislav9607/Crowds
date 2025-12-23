import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { styles } from './styles';
import { TalentNameForm } from '../../forms/TalentNameForm';
import { If } from '@components';
import { CreatePasswordForm } from '../../../forms';
import { useOnboardingUnAuthTalentScreen } from './useOnboardingUnAuthTalentScreen';
import { UINSaveConfirmationModal } from '../../../modals';

export const OnboardingUnAuthTalentScreen = () => {
  const {
    talentNameFormRef,
    createPasswordFormRef,
    uinSaveConfirmationModalRef,
    step,
    data,
    uin,
    showFullScreenLoader,
    setUIN,
    goToNextStep,
    goToPreviousStep,
  } = useOnboardingUnAuthTalentScreen();

  const titles = {
    0: "What's your name?",
    1: 'Create a password',
  };

  return (
    <OnboardingScreenLayout
      title={titles[step as keyof typeof titles]}
      stepsCount={Object.keys(titles).length}
      currentStep={step}
      onBackPress={goToPreviousStep}
      onForwardPress={goToNextStep}
      showLoader={showFullScreenLoader}
      footerProps={{
        containerStyle: { paddingHorizontal: 35, paddingTop: 20 },
      }}
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

      <UINSaveConfirmationModal ref={uinSaveConfirmationModalRef} />
    </OnboardingScreenLayout>
  );
};

