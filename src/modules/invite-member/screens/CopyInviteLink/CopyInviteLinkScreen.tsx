import { SvgXml } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

import { ScreenWrapper } from '@components';
import { ICONS } from '@assets';
import { AppButton, AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { copyToClipboard } from '@helpers';

export const CopyInviteLinkScreen = () => {
  const handleCopyLink = () => {
    copyToClipboard({
      text: 'Test text',
      successMessage: 'Invite link copied to clipboard!',
    });
  };

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Invite New Team Member"
      headerImageBg="purple"
      contentContainerStyle={styles.wrapper}
    >
      <View style={styles.contentContainer}>
        <AppText style={styles.title}>Invite Team Member!</AppText>
        <SvgXml
          xml={ICONS.copyInvitation()}
          style={styles.copyInvitationIcon}
        />

        <AppText style={styles.descriptionText}>
          You can use this link to invite someone who can proceed and take
          further actions on behalf of your company.
        </AppText>

        <AppText style={styles.noteText}>
          <AppText style={styles.noteTextBold}>Note:</AppText> Make sure that
          the team member must have downloaded the crowds now application before
          clicking on this link.
        </AppText>
      </View>

      <View style={styles.buttonsContainer}>
        <AppButton
          icon={ICONS.copyIcon('white')}
          iconPlace="left"
          title="Copy Invite Link"
          onPress={handleCopyLink}
        />
        <AppButton
          variant="withBorder"
          title="Close"
          titleStyles={styles.closeButtonTitle}
          onPress={() => {}}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h4,
    textAlign: 'center',
  },
  descriptionText: {
    ...TYPOGRAPHY.medium_12,
    textAlign: 'center',
    opacity: 0.5,
    marginBottom: 14,
  },
  noteText: {
    ...TYPOGRAPHY.regular_10,
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.main10,
    color: COLORS.main,
  },
  noteTextBold: {
    ...TYPOGRAPHY.bold_10,
    color: COLORS.main,
  },
  copyInvitationIcon: {
    marginVertical: 'auto',
  },
  buttonsContainer: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'flex-end',
    marginBottom: 24,
    gap: 16,
  },
  closeButtonTitle: {
    color: COLORS.black,
  },
});
