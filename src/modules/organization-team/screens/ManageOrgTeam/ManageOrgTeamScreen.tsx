import { ActivityIndicator, FlatList } from 'react-native';
import { AppButton, AppText } from '@ui';
import { ScreenWithScrollWrapper } from '@components';
import { goToScreen, Screens } from '@navigation';
import { useGetMe, useGetTeamMembers, TeamMemberItem } from '@actions';
import { COLORS } from '@styles';
import { TeamMemberCard } from '../../components/TeamMemberCard';
import { styles } from './styles';

export const ManageOrgTeamScreen = () => {
  const { organizationMember } = useGetMe();
  const organizationNetworkId =
    organizationMember?.current_context?.organization_network_id ?? '';

  const { data: teamMembers, isLoading } = useGetTeamMembers({
    organizationNetworkId,
  });

  const handleMemberPress = (member: TeamMemberItem) => {
    goToScreen(Screens.InviteNewMember, { mode: 'edit', member });
  };

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title="Manage Team Access"
      headerImageBg="purple"
    >
      <AppText typography="bold_20" style={styles.title}>
        Your team
      </AppText>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.main}
          style={styles.loader}
        />
      ) : teamMembers && teamMembers.length > 0 ? (
        <FlatList
          data={teamMembers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TeamMemberCard member={item} onPress={handleMemberPress} />
          )}
          scrollEnabled={false}
          style={styles.list}
        />
      ) : (
        <AppText typography="regular_14" style={styles.noTeamMembersFound}>
          No team members found
        </AppText>
      )}

      <AppButton
        onPress={() => goToScreen(Screens.InviteNewMember)}
        title="Invite new team member"
        wrapperStyles={styles.button}
      />
    </ScreenWithScrollWrapper>
  );
};
