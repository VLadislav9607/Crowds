import { TANSTACK_QUERY_KEYS } from '@constants';
import { goToScreen, Screens } from '@navigation';
import { prefetchUseGetMe } from '@actions';
import { queryClient } from '@services';
import { Session } from '@supabase/supabase-js';
import { UseGetMeResDto } from '@actions';

export const onNavigateAfterAuth = async (session: Session) => {
  await prefetchUseGetMe();
  const resp = queryClient.getQueryData<UseGetMeResDto>([
    TANSTACK_QUERY_KEYS.GET_ME,
  ]);
  if (session?.user?.app_metadata?.isTalent) {
    const lastCompletedStep = resp?.talent?.onboarding_copleted_step || 0;
    goToScreen(
      lastCompletedStep < 4 ? Screens.OnboardingAuthTalent : Screens.BottomTabs,
    );
  } else if (session?.user?.app_metadata?.isOrganizationMember) {
    const lastCompletedStep =
      resp?.organizationMember?.onboarding_copleted_step || 0;
    goToScreen(
      lastCompletedStep < 1
        ? Screens.OnboardingAuthOrganization
        : Screens.BottomTabs,
    );
  }
};
