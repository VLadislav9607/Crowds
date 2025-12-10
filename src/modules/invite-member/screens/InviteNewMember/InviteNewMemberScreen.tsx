import { StyleSheet } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { AppButton } from '@ui';
import { goToScreen, Screens } from '@navigation';

import { RoleAccessForm, TheirDetailsForm } from '../../forms';
import { useInviteMemberForm } from '../../hooks';

export const InviteNewMemberScreen = () => {
  const { formData } = useInviteMemberForm();

  const handleCreateInvitationLink = () => {
    formData.handleSubmit(data => {
      console.log('Form data:', data);
      goToScreen(Screens.CopyInviteLink);
    })();
  };

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title="Invite New Team Member"
      headerImageBg="purple"
      isFloatFooter={false}
      contentContainerStyle={styles.contentContainer}
      footer={
        <AppButton
          title="Create Invitation Link"
          onPress={handleCreateInvitationLink}
        />
      }
    >
      <TheirDetailsForm
        control={formData.control}
        errors={formData.formState.errors}
      />

      <RoleAccessForm control={formData.control} />
    </ScreenWithScrollWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
});
