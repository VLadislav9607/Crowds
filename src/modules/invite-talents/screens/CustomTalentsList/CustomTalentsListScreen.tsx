import { ScreenWrapper, AppFlashList, If } from '@components';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { IconButton } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';
import { useSendInvite, useCustomTalentsList } from '../../hooks';
import {
  CustomListTalentRow,
  CustomTalentsListEmptyState,
} from '../../components';

export const CustomTalentsListScreen = () => {
  const { params } = useScreenNavigation<Screens.CustomTalentsList>();
  const listId = params?.listId ?? '';
  const eventId = params?.eventId ?? '';
  const listName = params?.listName ?? '';

  const { inviteTalent, invitingTalentId, setInvitingTalentId } =
    useSendInvite();
  const {
    talentsList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleEndReached,
    totalCount,
    hasTalents,
  } = useCustomTalentsList(eventId, listId);

  const handleInvite = (talentId: string) => {
    setInvitingTalentId(talentId);
    inviteTalent({ eventId, talentId });
  };

  const handleRemove = () => {
    // TODO: Implement remove from list functionality
  };

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title={`${params?.listName} (${totalCount})`}
      contentContainerStyle={styles.contentContainer}
      customElement={
        <IconButton
          style={styles.addPlusButton}
          icon={ICONS.plus('white')}
          iconSize={24}
          onPress={() =>
            goToScreen(Screens.AddTalentsToList, {
              eventId,
              listId,
              listName,
            })
          }
        />
      }
    >
      <If condition={hasTalents}>
        <AppFlashList
          data={talentsList}
          gap={0}
          showBottomLoader={isLoading || isFetchingNextPage}
          onEndReached={hasNextPage ? handleEndReached : undefined}
          renderItem={({ item }) => (
            <CustomListTalentRow
              talent={item}
              invitingTalentId={invitingTalentId}
              onInvite={handleInvite}
              onRemove={handleRemove}
            />
          )}
          emptyText="No talents found"
        />
      </If>

      <If condition={!hasTalents && !isLoading}>
        <CustomTalentsListEmptyState
          eventId={eventId}
          listId={listId}
          listName={listName}
        />
      </If>
    </ScreenWrapper>
  );
};
