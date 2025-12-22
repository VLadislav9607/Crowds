import { NavigatorScreenParams } from '@react-navigation/native';
import { Role, OrganizationType } from '@modules/common';
import { Screens } from '../constants';
import { BottomTabsParamList } from './bottomStackNavigator.types';

export type RootStackParamList = {
  // Authorization
  [Screens.SplashScreen]: undefined;
  [Screens.First]: undefined;
  [Screens.ForgotPassword]: undefined;
  [Screens.SelectRole]: undefined;
  [Screens.SignIn]: undefined;
  [Screens.ForgotPassword]: undefined;
  [Screens.OnboardingAuthTalent]: undefined;
  [Screens.TalentProfileSetup]: undefined;
  [Screens.ChangePassword]: undefined;
  [Screens.OnboardingUnAuthTalent]: undefined;
  

  // Bottom Tabs
  [Screens.BottomTabs]: NavigatorScreenParams<BottomTabsParamList>;

  // Onboarding
  [Screens.Congratulations]: { role: Role };
  [Screens.OnboardingUnAuthOrganization]: { flow: OrganizationType };
  [Screens.OnboardingAuthTalent]: undefined;
  [Screens.OnboardingAuthOrganization]: undefined;
  [Screens.TermsAndPrivacy]: undefined;

  // Organization screens
  [Screens.CopyInviteLink]: undefined;
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
  [Screens.ManageEvent]: undefined;
  [Screens.EventParticipants]: undefined;
  // Talent screens
  [Screens.AvailabilitySetup]: undefined;
  [Screens.TalentProfileSetup]: undefined;

  // Chat screens
  [Screens.ChatRoom]: { chatId: string };
};
