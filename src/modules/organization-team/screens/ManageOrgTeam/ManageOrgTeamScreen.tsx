import { AppButton, AppText } from '@ui';
import { AppFlashList, If, ScreenWrapper, Skeleton } from '@components';
import { goToScreen, Screens } from '@navigation';
import { useGetMe, useGetTeamMembers, TeamMemberItem } from '@actions';
import { TeamMemberCard } from '../../components/TeamMemberCard';
import { styles } from './styles';
import { useRefetchQuery } from '@hooks';

export const ManageOrgTeamScreen = () => {
  const { organizationMember } = useGetMe();
  const brandId = organizationMember?.current_context?.brand?.id ?? '';
  const organizationNetworkId =
    organizationMember?.current_context?.organization_network_id ?? '';

  const {
    data: teamMembersData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetTeamMembers({
    brandId,
    organizationNetworkId,
  });

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const teamMembers = teamMembersData?.data;

  const handleMemberPress = (member: TeamMemberItem) => {
    goToScreen(Screens.InviteNewMember, { mode: 'edit', member });
  };

  const TeamMemberCardSkeleton = () => (
    <Skeleton>
      <Skeleton.Item gap={6}>
        <Skeleton.Item width={'100%'} borderRadius={10} height={140} />
        <Skeleton.Item width={'100%'} borderRadius={10} height={140} />
        <Skeleton.Item width={'100%'} borderRadius={10} height={140} />
      </Skeleton.Item>
    </Skeleton>
  );

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Manage Team Access"
      headerImageBg="purple"
    >
      <AppText typography="bold_20" style={styles.title}>
        Your team
      </AppText>

      <AppFlashList
        data={teamMembers}
        refreshing={isRefetchingQuery}
        onRefresh={refetchQuery}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TeamMemberCard member={item} onPress={handleMemberPress} />
        )}
        gap={0}
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        skeleton={isLoading ? <TeamMemberCardSkeleton /> : undefined}
        showBottomLoader={isFetchingNextPage}
        onEndReached={hasNextPage ? fetchNextPage : undefined}
        onEndReachedThreshold={0.5}
      />

      <If condition={true}>
        <AppButton
          onPress={() => goToScreen(Screens.InviteNewMember)}
          title="Invite new team member"
          wrapperStyles={styles.button}
        />
      </If>
    </ScreenWrapper>
  );
};
