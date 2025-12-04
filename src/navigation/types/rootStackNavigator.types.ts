import { NavigatorScreenParams } from '@react-navigation/native';

import { Role, OrganizationType } from '@modules/common';

import { Screens } from '../constants';
import { BottomStackScreenParams } from './bottomStackNavigator.types';

export type RootStackParamList = {
  // Authorization
  [Screens.First]: undefined;
  [Screens.SelectRole]: undefined;
  [Screens.BottomTabs]: NavigatorScreenParams<BottomStackScreenParams>;
  [Screens.OnboardingTalent]: undefined;
  [Screens.TalentProfileSetup]: undefined;

  // Bottom Tabs
  [Screens.BottomTabs]: NavigatorScreenParams<BottomStackScreenParams>;

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
