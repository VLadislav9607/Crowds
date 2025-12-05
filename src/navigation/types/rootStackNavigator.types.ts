import { NavigatorScreenParams } from '@react-navigation/native';

import { Role, OrganizationType } from '@modules/common';

import { Screens } from '../constants';
import { BottomTabsParamList } from './bottomStackNavigator.types';

export type RootStackParamList = {
  // Authorization
  [Screens.First]: undefined;
  [Screens.SelectRole]: undefined;
  [Screens.OnboardingTalent]: undefined;
  [Screens.TalentProfileSetup]: undefined;

  // Bottom Tabs
  [Screens.BottomTabs]: NavigatorScreenParams<BottomTabsParamList>;

  // Onboarding
  [Screens.OnboardingOrganization]: {
    flow: OrganizationType;
  };
  [Screens.TermsAndPrivacy]: undefined;
  [Screens.Congratulations]: { role: Role };

  // Invite Member
  [Screens.InviteNewMember]: undefined;
  [Screens.CopyInviteLink]: undefined;
};
