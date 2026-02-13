import { ScreenWrapper, AppFlashList, If } from '@components';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { IconButton } from '@ui';
import { ICONS } from '@assets';
import { useRemoveTalentFromCustomList } from '@actions';

import { styles } from './styles';
import { useSendInvite, useCustomTalentsList } from '../../hooks';
import {
  CustomListTalentRow,
  CustomTalentsListEmptyState,
} from '../../components';
import { YellowFlagInviteWarningModal } from '../../modals';

export const CustomTalentsListScreen = () => {
  const { params } = useScreenNavigation<Screens.CustomTalentsList>();
  const listId = params?.listId ?? '';
  const eventId = params?.eventId ?? '';
  const listName = params?.listName ?? '';

  const {
    invitingTalentId,
    handleInvite,
    yellowFlagModal,
    closeYellowFlagModal,
    confirmYellowFlagModal,
    isCheckingFlag,
  } = useSendInvite();

  const {
    talentsList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleEndReached,
    totalCount,
    hasTalents,
  } = useCustomTalentsList(eventId, listId);

  const { mutate: removeTalent } = useRemoveTalentFromCustomList(listId);

  const handleInvitePress = (talentId: string) => {
    handleInvite(eventId, talentId);
  };

  const handleRemove = (talentId: string) => {
    removeTalent({
      listId,
      eventId,
      talentId,
    });
  };

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title={`${params?.listName} (${totalCount})`}
      titleProps={{ style: styles.title }}
      contentContainerStyle={styles.contentContainer}
      customElement={
        <IconButton
          style={styles.addPlusButton}
          icon={ICONS.plus('white')}
          iconSize={24}
          onPress={() =>
            goToScreen(Screens.AddTalentsToList, {
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
              isCheckingFlag={isCheckingFlag}
              onInvite={handleInvitePress}
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

      <YellowFlagInviteWarningModal
        isVisible={yellowFlagModal?.visible ?? false}
        flag={yellowFlagModal?.flag ?? null}
        onClose={closeYellowFlagModal}
        onConfirm={confirmYellowFlagModal}
        isInviting={!!invitingTalentId}
      />
    </ScreenWrapper>
  );
};
