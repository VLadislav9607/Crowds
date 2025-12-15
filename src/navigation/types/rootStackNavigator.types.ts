import { NavigatorScreenParams } from '@react-navigation/native';
import { Role, OrganizationType } from '@modules/common';
import { Screens } from '../constants';
import { BottomTabsParamList } from './bottomStackNavigator.types';

export type RootStackParamList = {
  // Authorization
  [Screens.First]: undefined;
  [Screens.SelectRole]: undefined;
  [Screens.SignIn]: undefined;
  [Screens.ForgotPassword]: undefined;
  [Screens.OnboardingTalent]: undefined;
  [Screens.TalentProfileSetup]: undefined;
  [Screens.ChangePassword]: undefined;
  
  // Bottom Tabs
  [Screens.BottomTabs]: NavigatorScreenParams<BottomTabsParamList>;

  // Onboarding
  [Screens.OnboardingOrganization]: {
    flow: OrganizationType;
  };
  [Screens.TermsAndPrivacy]: undefined;
  [Screens.Congratulations]: { role: Role };

  // Organization screens
  [Screens.CreateEvent]: undefined;
  [Screens.EventsDashboard]: undefined;
  [Screens.InviteNewMember]: undefined;
  [Screens.CopyInviteLink]: undefined;

  // Talent screens
  [Screens.TalentSearchEvents]?: {
    autofocus?: boolean;
    showFilter?: boolean;
  };
  [Screens.TalentEventDetails]: {
    eventId: string;
  };
  [Screens.TalentNotificationSettings]: undefined;
};
