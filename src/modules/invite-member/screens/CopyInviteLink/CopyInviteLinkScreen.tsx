import { SvgXml } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { ScreenWrapper } from '@components';
import { ICONS } from '@assets';
import { AppButton, AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { copyToClipboard } from '@helpers';
import { Screens, RootStackParamList } from '@navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type CopyInviteLinkRouteProp = RouteProp<
  RootStackParamList,
  Screens.CopyInviteLink
>;

export const CopyInviteLinkScreen = () => {
  const route = useRoute<CopyInviteLinkRouteProp>();
  const { deepLink, memberName } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleCopyLink = () => {
    copyToClipboard({
      text: deepLink,
      successMessage: 'Invite link copied to clipboard!',
    });
  };

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Invite New Team Member"
      headerImageBg="purple"
      goBackCallback={() => navigation.pop(2)}
      contentContainerStyle={styles.wrapper}
    >
      <View style={styles.contentContainer}>
        <AppText style={styles.title}>Invite Team Member!</AppText>
        <SvgXml
          xml={ICONS.copyInvitation()}
          style={styles.copyInvitationIcon}
        />

        <AppText typography="regular_14" style={styles.descriptionText}>
          This is personal link for {memberName}. Share via email or messaging
          app.
        </AppText>

        <AppText typography="regular_14" color="main" style={styles.noteText}>
          <AppText typography="bold_14" color="main">
            Note:
          </AppText>{' '}
          Make sure that the team member must have downloaded the crowds now
          application before clicking on this link.
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
          onPress={() => navigation.pop(2)}
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
    textAlign: 'center',
    opacity: 0.5,
    marginBottom: 14,
  },
  noteText: {
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.main_10,
    color: COLORS.main,
  },
  noteTextBold: {
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
    gap: 10,
  },
  closeButtonTitle: {
    color: COLORS.black,
  },
});
