import { goToScreen, Screens } from '@navigation';
import { prefetchUseGetMe, prefetchExchangeRates } from '@actions';
import { fetchUserKycStatus, UserKycRecord } from '@modules/kyc';

const needsProcessingScreen = (kycData: UserKycRecord | null) =>
  kycData !== null &&
  kycData.status === 'pending' &&
  (kycData.checks_total ?? 0) > 0;

export const onNavigateAfterAuth = async () => {
  const myData = await prefetchUseGetMe();

  const { isTalent, isOrganizationMember, talent, me } = myData;

  if (isTalent) {
    prefetchExchangeRates(); // fire-and-forget
    const lastCompletedStep = talent?.onboarding_copleted_step || 0;

    if (lastCompletedStep < 6) {
      const kycData = await fetchUserKycStatus(me?.id || '');
      if (needsProcessingScreen(kycData)) {
        goToScreen(Screens.VerificationProcessing, {
          origin: 'talent_onboarding',
        });
        return;
      }

      goToScreen(Screens.OnboardingAuthTalent);
    } else {
      goToScreen(Screens.BottomTabs);
    }
  } else if (isOrganizationMember) {
    const kycData = await fetchUserKycStatus(me?.id || '');

    if (needsProcessingScreen(kycData)) {
      goToScreen(Screens.VerificationProcessing, {
        origin: 'org_onboarding',
      });
      return;
    }

    if (kycData?.status === 'completed') {
      goToScreen(Screens.BottomTabs);
      return;
    }

    goToScreen(Screens.OrgIdentityVerification);
  }
};
