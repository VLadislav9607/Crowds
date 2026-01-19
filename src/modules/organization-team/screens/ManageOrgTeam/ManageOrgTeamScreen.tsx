import { AppButton, AppText } from '@ui';
import { ScreenWithScrollWrapper } from '@components';
import { styles } from './styles';
import { goToScreen, Screens } from '@navigation';

export const ManageOrgTeamScreen = () => {
  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title="Manage Team Access"
      headerImageBg="purple"
    >
      <AppText typography="bold_20" style={styles.title}>
        Your team
      </AppText>
      {/* <View style={styles.separator} /> */}

      <AppText
        // onPress={() => goToScreen(Screens.InviteNewMember)}
        typography="regular_14"
        style={styles.noTeamMembersFound}
      >
        No team members found
      </AppText>

      <AppButton
        onPress={() => goToScreen(Screens.InviteNewMember)}
        title="Invite new team member"
        wrapperStyles={styles.button}
      />
    </ScreenWithScrollWrapper>
  );
};
