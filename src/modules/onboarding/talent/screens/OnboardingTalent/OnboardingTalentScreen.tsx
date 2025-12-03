import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { styles } from './styles';
import { TalentNameForm } from './components/TalentNameForm';
import { If } from '@components';
import { CreatePasswordForm } from '../../../components';
import { useOnboardingTalentScreen } from './useOnboardingTalentScreen';

export const OnboardingTalentScreen = () => {
  const {
    talentNameFormRef,
    createPasswordFormRef,
    step,
    data,
    goToNextStep,
    goToPreviousStep,
  } = useOnboardingTalentScreen();

  return (
    <OnboardingScreenLayout
      title="What's your name?"
      stepsCount={2}
      currentStep={0}
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
          />
        </If>
      </View>
    </OnboardingScreenLayout>
  );
};
