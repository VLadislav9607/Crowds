import { StyleSheet, ScrollView } from 'react-native';
import { useRef } from 'react';

import { ScreenWithScrollWrapper } from '@components';
import { AppButton } from '@ui';
import { goToScreen, Screens } from '@navigation';

import { RoleAccessForm, TheirDetailsForm } from '../../forms';
import { useInviteMemberForm } from '../../hooks';

export const InviteNewMemberScreen = () => {
  const { formData } = useInviteMemberForm();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleCreateInvitationLink = () => {
    formData.handleSubmit(
      data => {
        console.log('Form data:', data);
        goToScreen(Screens.CopyInviteLink);
      },
      () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      },
    )();
  };

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title="Invite New Team Member"
      headerImageBg="purple"
      isFloatFooter={false}
      contentContainerStyle={styles.contentContainer}
      scrollViewRef={scrollViewRef}
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
