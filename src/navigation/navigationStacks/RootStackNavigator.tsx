import { createStackNavigator } from '@react-navigation/stack';

import {
  FirstScreen,
  ForgotPasswordScreen,
  SelectRoleScreen,
  SignInScreen,
  SplashScreen,
} from '../../modules/auth';
import {
  OnboardingUnAuthTalentScreen,
  OnboardingAuthTalentScreen,
} from '../../modules/onboarding/talent/screens';
import {
  TalentLocationSetupScreen,
  TalentProfileSetupScreen,
} from '../../modules/profile/talent/screens';
import { AvailabilitySetupScreen } from '../../modules/talent-availability';
import {
  CongratulationsScreen,
  OrgIdentityVerificationScreen,
  OnboardingUnAuthOrganizationScreen,
  TermsAndPrivacyScreen,
} from '../../modules/onboarding';
import { OnboardingUnAuthTeamMemberScreen } from '../../modules/onboarding/team-member/screens';

import { RootStackParamList } from '../types';
import { Screens } from '../constants';
import { BottomTabsNavigator } from './BottomTabsNavigator';

import {
  AcceptInvitationScreen,
  CopyInviteLinkScreen,
  InviteNewMemberScreen,
} from '../../modules/invite-member';
import { CreateEventScreen } from '../../modules/create-event';
import {
  TalentEventDetailsScreen,
  TalentSearchEventsScreen,
  TalentPaymentHistoryScreen,
  AcceptEventNdaScreen,
} from '../../modules/events/talent/screens';
import {
  ChangePasswordScreen,
  OrgProfileSetupScreen,
  FAQScreen,
  TermsAndConditionsScreen,
  PrivacyPolicyScreen,
} from '@modules/profile';
import {
  NotificationSettingsScreen,
  NotificationsListScreen,
} from '../../modules/notifications';
import {
  ManageEventScreen,
  MessageTalentsScreen,
} from '../../modules/event-management';
import { ChatRoomScreen } from '../../modules/chats';
import {
  NoShowTalentsScreen,
  CheckedInTalentsScreen,
  CheckedOutTalentsScreen,
  TaskCompletionTalentsScreen,
} from '../../modules/event-participants';
import {
  ApplicantProfileScreen,
  EventApplicantsScreen,
} from '../../modules/event-applicants';
import { TalentProfileScreen } from '../../modules/talent-profile';
import { InviteTalentsScreen } from '../../modules/invite-talents';
import {
  AddTalentsToListScreen,
  CustomTalentsListScreen,
  MyListsScreen,
} from '../../modules/custom-lists';
import { ManageOrgTeamScreen } from '../../modules/organization-team';
import {
  TalentFoldersScreen,
  CreateEventsFolder,
  TalentEventsFolder,
  RenameEventsFolder,
} from '../../modules/events-folders';
import { OrgEventDetails } from '../../modules/events/organization/screens';
import { EventQRCodesScreen } from '../../modules/event-management';
import { PDFViewerScreen } from '../../modules/common';
import {
  FlagParticipantScreen,
  FlagOrganizationScreen,
} from '../../modules/flags';
import { VerificationProcessingScreen } from '../../modules/kyc/screens';
import { StripeConnectOnboardingScreen } from '../../modules/stripe-connect';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.SplashScreen}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name={Screens.SplashScreen} component={SplashScreen} />
      <RootStack.Screen name={Screens.First} component={FirstScreen} />
      <RootStack.Screen
        name={Screens.SelectRole}
        component={SelectRoleScreen}
      />
      <RootStack.Screen
        name={Screens.OnboardingUnAuthTalent}
        component={OnboardingUnAuthTalentScreen}
      />
      <RootStack.Screen
        name={Screens.BottomTabs}
        component={BottomTabsNavigator}
        options={{ gestureEnabled: false }}
      />
      <RootStack.Screen name={Screens.SignIn} component={SignInScreen} />
      <RootStack.Screen
        name={Screens.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen
        options={{ gestureEnabled: false }}
        name={Screens.OnboardingAuthTalent}
        component={OnboardingAuthTalentScreen}
      />

      <RootStack.Screen
        options={{ gestureEnabled: false }}
        name={Screens.OrgIdentityVerification}
        component={OrgIdentityVerificationScreen}
      />

      <RootStack.Screen
        name={Screens.TalentProfileSetup}
        component={TalentProfileSetupScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <RootStack.Screen
        name={Screens.OnboardingUnAuthOrganization}
        component={OnboardingUnAuthOrganizationScreen}
      />

      <RootStack.Screen
        name={Screens.TermsAndPrivacy}
        component={TermsAndPrivacyScreen}
      />

      <RootStack.Screen
        name={Screens.Congratulations}
        component={CongratulationsScreen}
      />

      <RootStack.Screen
        name={Screens.InviteNewMember}
        component={InviteNewMemberScreen}
      />

      <RootStack.Screen
        name={Screens.CopyInviteLink}
        component={CopyInviteLinkScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <RootStack.Screen
        name={Screens.AcceptInvitation}
        component={AcceptInvitationScreen}
      />

      <RootStack.Screen
        name={Screens.OnboardingUnAuthTeamMember}
        component={OnboardingUnAuthTeamMemberScreen}
        options={{ gestureEnabled: false }}
      />

      <RootStack.Screen
        name={Screens.CreateEvent}
        component={CreateEventScreen}
        options={{ gestureEnabled: false }}
      />
      <RootStack.Screen
        name={Screens.TalentSearchEvents}
        component={TalentSearchEventsScreen}
      />
      <RootStack.Screen
        name={Screens.TalentEventDetails}
        component={TalentEventDetailsScreen}
      />
      <RootStack.Screen
        name={Screens.AcceptEventNda}
        component={AcceptEventNdaScreen}
      />

      <RootStack.Screen
        name={Screens.ChangePassword}
        component={ChangePasswordScreen}
      />
      <RootStack.Screen name={Screens.FAQ} component={FAQScreen} />
      <RootStack.Screen
        name={Screens.TermsAndConditions}
        component={TermsAndConditionsScreen}
      />
      <RootStack.Screen
        name={Screens.PrivacyPolicy}
        component={PrivacyPolicyScreen}
      />

      <RootStack.Screen
        name={Screens.ManageEvent}
        component={ManageEventScreen}
      />

      <RootStack.Screen
        name={Screens.MessageTalents}
        component={MessageTalentsScreen}
      />

      <RootStack.Screen
        name={Screens.NoShowTalents}
        component={NoShowTalentsScreen}
      />

      <RootStack.Screen
        name={Screens.CheckedInTalents}
        component={CheckedInTalentsScreen}
      />

      <RootStack.Screen
        name={Screens.CheckedOutTalents}
        component={CheckedOutTalentsScreen}
      />
      <RootStack.Screen
        name={Screens.TaskCompletionTalents}
        component={TaskCompletionTalentsScreen}
      />

      <RootStack.Screen
        name={Screens.EventApplicants}
        component={EventApplicantsScreen}
      />

      <RootStack.Screen
        name={Screens.FlagParticipant}
        component={FlagParticipantScreen}
      />

      <RootStack.Screen
        name={Screens.AvailabilitySetup}
        component={AvailabilitySetupScreen}
      />

      <RootStack.Screen name={Screens.ChatRoom} component={ChatRoomScreen} />

      <RootStack.Screen
        name={Screens.NotificationSettings}
        component={NotificationSettingsScreen}
      />
      <RootStack.Screen
        name={Screens.ApplicantProfile}
        component={ApplicantProfileScreen}
      />
      <RootStack.Screen
        name={Screens.TalentProfile}
        component={TalentProfileScreen}
      />

      <RootStack.Screen
        name={Screens.InviteTalents}
        component={InviteTalentsScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <RootStack.Screen
        name={Screens.CustomTalentsList}
        component={CustomTalentsListScreen}
      />

      <RootStack.Screen
        name={Screens.AddTalentsToList}
        component={AddTalentsToListScreen}
      />
      <RootStack.Screen name={Screens.MyLists} component={MyListsScreen} />
      <RootStack.Screen
        name={Screens.ManageOrgTeam}
        component={ManageOrgTeamScreen}
      />
      <RootStack.Screen
        name={Screens.TalentFolders}
        component={TalentFoldersScreen}
      />
      <RootStack.Screen
        name={Screens.CreateEventsFolder}
        component={CreateEventsFolder}
      />
      <RootStack.Screen
        name={Screens.TalentEventsFolder}
        component={TalentEventsFolder}
      />
      <RootStack.Screen
        name={Screens.RenameEventsFolder}
        component={RenameEventsFolder}
      />
      <RootStack.Screen
        name={Screens.TalentLocationSetup}
        component={TalentLocationSetupScreen}
      />
      <RootStack.Screen
        name={Screens.OrgProfileSetup}
        component={OrgProfileSetupScreen}
      />
      <RootStack.Screen
        name={Screens.OrgEventDetails}
        component={OrgEventDetails}
      />
      <RootStack.Screen
        name={Screens.EventQRCodes}
        component={EventQRCodesScreen}
      />
      <RootStack.Screen
        name={Screens.PDFViewer}
        component={PDFViewerScreen}
        options={{
          presentation: 'modal',
        }}
      />

      <RootStack.Screen
        name={Screens.TalentPaymentHistory}
        component={TalentPaymentHistoryScreen}
      />
      <RootStack.Screen
        name={Screens.FlagOrganization}
        component={FlagOrganizationScreen}
      />
      <RootStack.Screen
        name={Screens.Notifications}
        component={NotificationsListScreen}
      />
      <RootStack.Screen
        name={Screens.VerificationProcessing}
        component={VerificationProcessingScreen}
        options={{ gestureEnabled: false }}
      />
      <RootStack.Screen
        name={Screens.StripeConnectOnboarding}
        component={StripeConnectOnboardingScreen}
      />
    </RootStack.Navigator>
  );
};
