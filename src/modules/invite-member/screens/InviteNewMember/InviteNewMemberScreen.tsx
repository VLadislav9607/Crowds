import { StyleSheet, ScrollView, Alert } from 'react-native';
import { useRef } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';

import { ScreenWithScrollWrapper } from '@components';
import { AppButton } from '@ui';
import { goBack, goToScreen, Screens, RootStackParamList } from '@navigation';
import {
  useCreateTeamInvitation,
  useUpdateTeamMemberCapabilities,
  useRemoveTeamMember,
  useRevokeTeamInvitation,
  useUpdateTeamInvitation,
} from '@actions';
import { showErrorToast, showSuccessToast } from '@helpers';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { COLORS } from '@styles';

import { RoleAccessForm, TheirDetailsForm } from '../../forms';
import { useInviteMemberForm, InviteMemberFormData } from '../../hooks';

type InviteNewMemberRouteProp = RouteProp<
  RootStackParamList,
  Screens.InviteNewMember
>;

export const InviteNewMemberScreen = () => {
  const route = useRoute<InviteNewMemberRouteProp>();
  const params = route.params;
  const isEditMode = params?.mode === 'edit';
  const member = params?.member;
  const isMemberType = member?.type === 'member';

  const { formData } = useInviteMemberForm(
    isEditMode && member
      ? {
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          positionInCompany: member.position,
          roleAccess: member.roleAccess,
        }
      : undefined,
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const invalidateTeamMembers = () => {
    queryClient.invalidateQueries({
      queryKey: [TANSTACK_QUERY_KEYS.GET_TEAM_MEMBERS],
    });
  };

  const createInvitation = useCreateTeamInvitation({
    onSuccess: data => {
      goToScreen(Screens.CopyInviteLink, { deepLink: data.deepLink });
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to create invitation');
    },
  });

  const updateCapabilities = useUpdateTeamMemberCapabilities({
    onSuccess: () => {
      invalidateTeamMembers();
      showSuccessToast('Team member updated');
      goBack();
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to update team member');
    },
  });

  const removeTeamMember = useRemoveTeamMember({
    onSuccess: () => {
      invalidateTeamMembers();
      showSuccessToast('Team member removed');
      goBack();
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to remove team member');
    },
  });

  const revokeInvitation = useRevokeTeamInvitation({
    onSuccess: () => {
      invalidateTeamMembers();
      showSuccessToast('Invitation revoked');
      goBack();
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to revoke invitation');
    },
  });

  const updateInvitation = useUpdateTeamInvitation({
    onSuccess: () => {
      invalidateTeamMembers();
      showSuccessToast('Invitation updated');
      goBack();
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to update invitation');
    },
  });

  const handleCreateInvitationLink = () => {
    formData.handleSubmit(
      (data: InviteMemberFormData) => {
        createInvitation.mutate({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          position: data.positionInCompany,
          roleAccess: data.roleAccess,
        });
      },
      () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      },
    )();
  };

  const handleSaveChanges = () => {
    formData.handleSubmit((data: InviteMemberFormData) => {
      if (isMemberType && member?.officeMemberId) {
        updateCapabilities.mutate({
          officeMemberId: member.officeMemberId,
          roleAccess: data.roleAccess,
        });
      } else if (member?.invitationId) {
        updateInvitation.mutate({
          invitationId: member.invitationId,
          roleAccess: data.roleAccess,
        });
      }
    })();
  };

  const handleRemove = () => {
    const title = isMemberType ? 'Remove Team Member' : 'Revoke Invitation';
    const message = isMemberType
      ? `Are you sure you want to remove ${member?.firstName} ${member?.lastName} from the team?`
      : `Are you sure you want to revoke the invitation for ${member?.firstName} ${member?.lastName}?`;

    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: isMemberType ? 'Remove' : 'Revoke',
        style: 'destructive',
        onPress: () => {
          if (isMemberType && member?.officeMemberId) {
            removeTeamMember.mutate({
              officeMemberId: member.officeMemberId,
            });
          } else if (member?.invitationId) {
            revokeInvitation.mutate({
              invitationId: member.invitationId,
            });
          }
        },
      },
    ]);
  };

  const isSaving = updateCapabilities.isPending || updateInvitation.isPending;
  const isRemoving = removeTeamMember.isPending || revokeInvitation.isPending;

  const headerTitle = isEditMode
    ? isMemberType
      ? 'Edit Team Member'
      : 'Edit Invitation'
    : 'Invite New Team Member';

  const submitButtonTitle = isEditMode
    ? isMemberType
      ? 'Save Changes'
      : 'Update Invitation'
    : 'Create Invitation Link';

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title={headerTitle}
      headerImageBg="purple"
      isFloatFooter={false}
      contentContainerStyle={styles.contentContainer}
      scrollViewRef={scrollViewRef}
      footer={
        <>
          <AppButton
            title={submitButtonTitle}
            onPress={
              isEditMode ? handleSaveChanges : handleCreateInvitationLink
            }
            isLoading={isEditMode ? isSaving : createInvitation.isPending}
            isDisabled={
              isEditMode ? isSaving || isRemoving : createInvitation.isPending
            }
          />
          {isEditMode && (
            <AppButton
              title={isMemberType ? 'Remove from team' : 'Revoke Invitation'}
              onPress={handleRemove}
              variant="withBorder"
              isLoading={isRemoving}
              isDisabled={isSaving || isRemoving}
              titleStyles={styles.removeButtonTitle}
              wrapperStyles={styles.removeButton}
            />
          )}
        </>
      }
    >
      <TheirDetailsForm
        control={formData.control}
        errors={formData.formState.errors}
        disabled={isEditMode}
      />

      <RoleAccessForm control={formData.control} />
    </ScreenWithScrollWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
  removeButton: {
    marginTop: 12,
  },
  removeButtonTitle: {
    color: COLORS.red,
  },
});
