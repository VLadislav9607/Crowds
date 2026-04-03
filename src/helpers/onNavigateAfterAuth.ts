import { goToScreen, resetToScreen, Screens } from '@navigation';
import { prefetchUseGetMe, prefetchExchangeRates } from '@actions';
import { fetchUserKycStatus, UserKycRecord } from '@modules/kyc';
import { supabase } from '@services';

const needsProcessingScreen = (kycData: UserKycRecord | null) =>
  kycData !== null &&
  kycData.status === 'pending' &&
  (kycData.checks_total ?? 0) > 0;

export const onNavigateAfterAuth = async () => {
  const myData = await prefetchUseGetMe();

  const { isTalent, isOrganizationMember, talent, me } = myData;

  const deletedAt = isTalent
    ? talent?.deleted_at
    : (me as any)?.deleted_at;

  if (deletedAt) {
    resetToScreen(Screens.AccountPendingDeletion);
    return;
  }

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

      if (kycData?.status === 'completed' && !talent?.terms_accepted_at) {
        goToScreen(Screens.TermsAgreement, { origin: 'talent_onboarding' });
        return;
      }

      goToScreen(Screens.OnboardingAuthTalent);
    } else {
      resetToScreen(Screens.BottomTabs);
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
      const { data: orgUser } = await supabase
        .from('org_users')
        .select('terms_accepted_at')
        .eq('id', me?.id || '')
        .single();

      if (!orgUser?.terms_accepted_at) {
        goToScreen(Screens.TermsAgreement, { origin: 'org_onboarding' });
        return;
      }
      resetToScreen(Screens.BottomTabs);
      return;
    }

    goToScreen(Screens.OrgIdentityVerification);
  }
};
