import { ActivityIndicator, View } from 'react-native';
import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { If } from '@components';
import { AppButton, AppText } from '@ui';
import { CreatePasswordForm } from '../../../forms';
import { ActionConfirmationModal, OtpVerificationForm } from '@modules/common';
import { UINSaveConfirmationModal } from '../../../modals';
import { TeamMemberInfoForm } from '../../forms/TeamMemberInfoForm';
import { InvitationDetailsStep } from '../../components/InvitationDetailsStep';
import { useOnboardingUnAuthTeamMember } from './useOnboardingUnAuthTeamMember';
import { styles } from './styles';

export const OnboardingUnAuthTeamMemberScreen = () => {
  const {
    otpVerificationFormRef,
    teamMemberInfoFormRef,
    createPasswordFormRef,
    uinSaveConfirmationModalRef,
    stopOnboardingModalRef,
    step,
    invitation,
    isLoadingInvitation,
    invitationError,
    showFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    handleAcceptInvitation,
    handleDeclineInvitation,
    handleResendOtp,
    handleOtpSubmit,
  } = useOnboardingUnAuthTeamMember();

  const titles: Record<number, string> = {
    0: 'Team Invitation',
    1: 'Verification Code',
    2: 'Team Invitation',
    3: 'Your Information',
    4: 'Create a password',
  };

  // Step 0: Loading invitation
  if (step === 0) {
    return (
      <OnboardingScreenLayout
        title={''}
        currentStep={0}
        onBackPress={() => {}}
        onForwardPress={() => {}}
        footerProps={{
          containerStyle: { display: 'none' },
        }}
        contentContainerStyle={{ flex: 1, paddingBottom: 100 }}
        headerProps={{
          headerStyles: { backgroundColor: COLORS.black },
        }}
      >
        <View style={styles.centerContainer}>
          {isLoadingInvitation && (
            <>
              <ActivityIndicator size="large" color={COLORS.main} />
              <AppText
                typography="medium_14"
                color="dark_gray"
                style={styles.loadingText}
              >
                Loading invitation...
              </AppText>
            </>
          )}

          {invitationError && (
            <>
              <AppText typography="h4" style={styles.errorTitle}>
                Invalid Invitation
              </AppText>
              <AppText
                typography="medium_14"
                color="dark_gray"
                style={styles.errorText}
              >
                {invitationError.message ||
                  'This invitation is no longer valid.'}
              </AppText>
              <AppButton
                variant="withBorder"
                title="Go Back"
                onPress={goToPreviousStep}
              />
            </>
          )}
        </View>
      </OnboardingScreenLayout>
    );
  }

  return (
    <OnboardingScreenLayout
      title={titles[step]}
      stepsCount={Object.keys(titles).length - 1}
      currentStep={step - 1}
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
        <If condition={step === 1}>
          <OtpVerificationForm
            ref={otpVerificationFormRef}
            email={invitation?.email ?? ''}
            onComplete={handleOtpSubmit}
            onResendButtonPress={handleResendOtp}
          />
        </If>

        <If condition={step === 2}>
          <InvitationDetailsStep
            invitation={invitation!}
            onAccept={handleAcceptInvitation}
            onDecline={handleDeclineInvitation}
          />
        </If>

        <If condition={step === 3}>
          <TeamMemberInfoForm
            ref={teamMemberInfoFormRef}
            defaultValues={{
              firstName: invitation?.firstName ?? '',
              lastName: invitation?.lastName ?? '',
              position: invitation?.position ?? '',
            }}
          />
        </If>

        <If condition={step === 4}>
          <CreatePasswordForm ref={createPasswordFormRef} />
        </If>
      </View>

      <UINSaveConfirmationModal ref={uinSaveConfirmationModalRef} />
      <ActionConfirmationModal ref={stopOnboardingModalRef} />
    </OnboardingScreenLayout>
  );
};
