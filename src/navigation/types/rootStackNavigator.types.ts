import { NavigatorScreenParams } from '@react-navigation/native';
import { ChatType } from '@actions';
import { OrganizationType, Role } from '@modules/common';
import { Screens } from '../constants';
import { BottomTabsParamList } from './bottomStackNavigator.types';
import { BucketsTypes } from '@configs';

export type RootStackParamList = {
  // Common screens
  [Screens.PDFViewer]: {
    url?: string;
    pdfPath?: string;
    bucket?: BucketsTypes;
    title?: string;
  };

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

  // Events Folders
  [Screens.TalentFolders]: undefined;
  [Screens.CreateEventsFolder]: undefined;
  [Screens.TalentEventsFolder]: { folderId: string; folderName: string };
  [Screens.RenameEventsFolder]: { folderId: string; folderName: string };

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
  [Screens.InviteTalents]: { eventId: string; forwardFrom?: Screens };
  [Screens.CustomTalentsList]: {
    listName: string;
    listId: string;
    eventId: string;
  };
  [Screens.AddTalentsToList]: {
    listId: string;
    listName: string;
  };
  [Screens.ManageOrgTeam]: undefined;
  [Screens.OrgProfileSetup]: undefined;
  [Screens.OrgEventDetails]: { eventId: string };

  // Event Management screens
  [Screens.EventQRCodes]: { eventId: string; timezone?: string };

  // Talent screens
  [Screens.TalentSearchEvents]?: {
    autofocus?: boolean;
    showFilter?: boolean;
  };
  [Screens.TalentEventDetails]: {
    participationId: string;
    eventId: string;
  };
  [Screens.ManageEvent]: { eventId: string };
  [Screens.EventParticipants]: undefined;
  [Screens.FlagParticipant]: { talentId: string; eventId: string };
  [Screens.EventApplicants]: { eventId: string; capacity: number };

  // Talent screens
  [Screens.AvailabilitySetup]: undefined;
  [Screens.TalentProfileSetup]: undefined;
  [Screens.TalentLocationSetup]: undefined;
  [Screens.TalentEventHistory]: undefined;
  [Screens.FlagOrganization]: {
    eventId: string;
    officeId: string | null;
    brandName: string | null;
    brandLogoPath: string | null;
  };

  // Chat screens
  [Screens.ChatRoom]: {
    chatId: string;
    title: string;
    chatType: ChatType;
    imageUrl: string;
  };

  //Profile
  [Screens.NotificationSettings]: { role: Role };
};
