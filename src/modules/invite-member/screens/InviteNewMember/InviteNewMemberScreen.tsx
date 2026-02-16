import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useRef } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { ScreenWithScrollWrapper } from '@components';
import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';
import { goBack, goToScreen, Screens, RootStackParamList } from '@navigation';
import {
  useCreateTeamInvitation,
  useUpdateTeamMemberCapabilities,
  useRemoveTeamMember,
  useRevokeTeamInvitation,
  useUpdateTeamInvitation,
} from '@actions';
import { showErrorToast, showSuccessToast, copyToClipboard } from '@helpers';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { COLORS } from '@styles';

import {
  ActionConfirmationModal,
  ActionConfirmationModalRef,
} from '@modules/common';

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
  const confirmationModalRef = useRef<ActionConfirmationModalRef>(null);

  const invalidateTeamMembers = async () => {
    await queryClient.invalidateQueries({
      queryKey: [TANSTACK_QUERY_KEYS.GET_TEAM_MEMBERS],
    });
  };

  const createInvitation = useCreateTeamInvitation({
    onSuccess: async data => {
      const { firstName, lastName } = formData.getValues();
      await invalidateTeamMembers();
      goToScreen(Screens.CopyInviteLink, {
        deepLink: data.deepLink,
        memberName: `${firstName} ${lastName}`,
      });
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to create invitation');
    },
  });

  const updateCapabilities = useUpdateTeamMemberCapabilities({
    onSuccess: async () => {
      await invalidateTeamMembers();
      showSuccessToast('Team member updated');
      goBack();
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to update team member');
    },
  });

  const removeTeamMember = useRemoveTeamMember({
    onSuccess: async () => {
      await invalidateTeamMembers();
      showSuccessToast('Team member removed');
      goBack();
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to remove team member');
    },
  });

  const revokeInvitation = useRevokeTeamInvitation({
    onSuccess: async () => {
      await invalidateTeamMembers();
      showSuccessToast('Invitation revoked');
      goBack();
    },
    onError: (error: { message?: string }) => {
      showErrorToast(error?.message || 'Failed to revoke invitation');
    },
  });

  const updateInvitation = useUpdateTeamInvitation({
    onSuccess: async () => {
      await invalidateTeamMembers();
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
      errors => {
        const roleAccessError = errors.roleAccess as
          | { message?: string }
          | undefined;
        if (roleAccessError?.message) {
          showErrorToast(roleAccessError.message);
        }
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      },
    )();
  };

  const handleSaveChanges = () => {
    formData.handleSubmit(
      (data: InviteMemberFormData) => {
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
      },
      errors => {
        const roleAccessError = errors.roleAccess as
          | { message?: string }
          | undefined;
        if (roleAccessError?.message) {
          showErrorToast(roleAccessError.message);
        }
      },
    )();
  };

  const handleRemove = () => {
    confirmationModalRef.current?.open({
      title: isMemberType ? 'Remove Team Member' : 'Revoke Invitation',
      subtitle: isMemberType
        ? `Are you sure you want to remove ${member?.firstName} ${member?.lastName} from the team?`
        : `Are you sure you want to revoke the invitation for ${member?.firstName} ${member?.lastName}?`,
      confirmButtonText: isMemberType ? 'Remove' : 'Revoke',
      onConfirm: async () => {
        if (isMemberType && member?.officeMemberId) {
          await removeTeamMember.mutateAsync({
            officeMemberId: member.officeMemberId,
          });
        } else if (member?.invitationId) {
          await revokeInvitation.mutateAsync({
            invitationId: member.invitationId,
          });
        }
      },
    });
  };

  const isInvitationType = member?.type === 'invitation';
  const inviteLink =
    isInvitationType && member?.invitationToken
      ? `crowdsnow://invite/${member.invitationToken}`
      : null;

  const handleCopyInviteLink = () => {
    if (inviteLink) {
      copyToClipboard({
        text: inviteLink,
        successMessage: 'Invite link copied to clipboard!',
      });
    }
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
    <>
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
              isDisabled={isRemoving}
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

        {inviteLink && (
          <View style={styles.inviteLinkCard}>
            <AppText typography="bold_14" color="main">
              Personal Invite Link
            </AppText>
            <View style={styles.inviteLinkRow}>
              <AppText
                typography="medium_14"
                numberOfLines={1}
                style={styles.inviteLinkText}
              >
                {inviteLink}
              </AppText>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyInviteLink}
                activeOpacity={0.7}
              >
                <SvgXml xml={ICONS.copyIcon('white')} width={16} height={16} />
                <AppText typography="bold_14" color="white">
                  Copy
                </AppText>
              </TouchableOpacity>
            </View>
            <AppText typography="medium_12" color="black_60">
              Share via email or messaging app. Make sure that the team member
              must have downloaded the crowds now application before clicking on
              this link.
            </AppText>
          </View>
        )}
      </ScreenWithScrollWrapper>

      <ActionConfirmationModal ref={confirmationModalRef} />
    </>
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
  inviteLinkCard: {
    backgroundColor: COLORS.main_10,
    borderRadius: 12,
    padding: 16,
    gap: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
  inviteLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingLeft: 12,
    overflow: 'hidden',
    height: 44,
    paddingRight: 4,
    gap: 10,
  },
  inviteLinkText: {
    flex: 1,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.main,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 36,
  },
});
