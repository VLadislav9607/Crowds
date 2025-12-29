import { goToScreen, Screens } from '@navigation';
import { prefetchUseGetMe } from '@actions';
import { fetchUserKycStatus } from '@modules/kyc';

export const onNavigateAfterAuth = async () => {
  const myData = await prefetchUseGetMe();

  const { isTalent, isOrganizationMember, talent, me } = myData;

  if (isTalent) {
    const lastCompletedStep = talent?.onboarding_copleted_step || 0;
    goToScreen(
      lastCompletedStep < 4 ? Screens.OnboardingAuthTalent : Screens.BottomTabs,
    );
  } else if (isOrganizationMember) {
    const kycData = await fetchUserKycStatus(me?.id || '');
    const isVerified = kycData?.status === 'completed';

    if (!isVerified) {
      goToScreen(Screens.OrgIdentityVerification);
      return;
    }

    goToScreen(Screens.BottomTabs);
  }
};
