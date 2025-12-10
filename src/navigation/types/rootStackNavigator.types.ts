import { NavigatorScreenParams } from '@react-navigation/native';
import { Role, OrganizationType } from '@modules/common';
import { Screens } from '../constants';
import { BottomTabsParamList } from './bottomStackNavigator.types';

export type RootStackParamList = {
  // Authorization
  [Screens.First]: undefined;
  [Screens.ForgotPassword]: undefined;
  [Screens.SelectRole]: undefined;
  [Screens.SignIn]: undefined;

  // Bottom Tabs
  [Screens.BottomTabs]: NavigatorScreenParams<BottomTabsParamList>;

  // Onboarding
  [Screens.Congratulations]: { role: Role };
  [Screens.OnboardingOrganization]: { flow: OrganizationType };
  [Screens.OnboardingTalent]: undefined;
  [Screens.TermsAndPrivacy]: undefined;

  // Organization screens
  [Screens.CopyInviteLink]: undefined;
  [Screens.CreateEvent]: undefined;
  [Screens.EventsDashboard]: undefined;
  [Screens.InviteNewMember]: undefined;
  [Screens.ManageEvent]: undefined;

  // Talent screens
  [Screens.AvailabilitySetup]: undefined;
  [Screens.TalentProfileSetup]: undefined;
};
