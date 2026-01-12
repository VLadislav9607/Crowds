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
  [Screens.OrgIdentityVerification]: undefined;
  [Screens.TermsAndPrivacy]: undefined;
  [Screens.VerificationPerson]: { url: string; userId: string };

  // Organization screens
  [Screens.CopyInviteLink]: undefined;
  [Screens.CreateEvent]: { draftId?: string };
  [Screens.EventsDashboard]: undefined;
  [Screens.InviteNewMember]: undefined;
  [Screens.CopyInviteLink]: undefined;
  [Screens.ApplicantProfile]: { applicantId: string };
  [Screens.InviteTalents]: undefined;
  [Screens.CustomTalentsList]: { listName: string; listId: string };
  [Screens.AddTalentsToList]: { listId: string };
  // Talent screens
  [Screens.TalentSearchEvents]?: {
    autofocus?: boolean;
    showFilter?: boolean;
  };
  [Screens.TalentEventDetails]: {
    eventId: string;
  };
  [Screens.ManageEvent]: undefined;
  [Screens.EventParticipants]: undefined;
  [Screens.FlagParticipant]: { participantId: string };
  // Talent screens
  [Screens.AvailabilitySetup]: undefined;
  [Screens.TalentProfileSetup]: undefined;

  // Chat screens
  [Screens.ChatRoom]: { chatId: string };

  //Profile
  [Screens.NotificationSettings]: { role: Role };
};
