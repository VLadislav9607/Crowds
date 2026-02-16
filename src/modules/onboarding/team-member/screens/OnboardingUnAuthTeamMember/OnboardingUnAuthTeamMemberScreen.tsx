import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { styles } from './styles';
import { If } from '@components';
import { CreatePasswordForm } from '../../../forms';
import { OtpVerificationForm } from '@modules/common';
import { UINSaveConfirmationModal } from '../../../modals';
import { TeamMemberInfoForm } from '../../forms/TeamMemberInfoForm';
import { InvitationDetailsStep } from '../../components/InvitationDetailsStep';
import { useOnboardingUnAuthTeamMember } from './useOnboardingUnAuthTeamMember';

export const OnboardingUnAuthTeamMemberScreen = () => {
  const {
    otpVerificationFormRef,
    teamMemberInfoFormRef,
    createPasswordFormRef,
    uinSaveConfirmationModalRef,
    step,
    invitation,
    showFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    handleAcceptInvitation,
    handleDeclineInvitation,
    handleResendOtp,
    handleOtpSubmit,
  } = useOnboardingUnAuthTeamMember();

  const titles: Record<number, string> = {
    0: 'Verification Code',
    1: 'Team Invitation',
    2: 'Your Information',
    3: 'Create a password',
  };

  return (
    <OnboardingScreenLayout
      title={titles[step]}
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
        <If condition={step === 0}>
          <OtpVerificationForm
            ref={otpVerificationFormRef}
            email={invitation.email}
            onComplete={handleOtpSubmit}
            onResendButtonPress={handleResendOtp}
          />
        </If>

        <If condition={step === 1}>
          <InvitationDetailsStep
            invitation={invitation}
            onAccept={handleAcceptInvitation}
            onDecline={handleDeclineInvitation}
          />
        </If>

        <If condition={step === 2}>
          <TeamMemberInfoForm
            ref={teamMemberInfoFormRef}
            defaultValues={{
              firstName: invitation.firstName,
              lastName: invitation.lastName,
              position: invitation.position,
            }}
          />
        </If>

        <If condition={step === 3}>
          <CreatePasswordForm ref={createPasswordFormRef} />
        </If>
      </View>

      <UINSaveConfirmationModal ref={uinSaveConfirmationModalRef} />
    </OnboardingScreenLayout>
  );
};
