import { ScreenWrapper, AppFlashList, If } from '@components';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { IconButton } from '@ui';
import { ICONS } from '@assets';
import { useRemoveTalentFromCustomList } from '@actions';

import { useSendInvite } from '../../../invite-talents/hooks';
import { YellowFlagInviteWarningModal } from '../../../flags/modals';

import { styles } from './styles';
import { useCustomTalentsList } from '../../hooks';
import {
  CustomListTalentRow,
  CustomTalentsListEmptyState,
} from '../../components';

export const CustomTalentsListScreen = () => {
  const { params } = useScreenNavigation<Screens.CustomTalentsList>();
  const listId = params?.listId ?? '';
  const eventId = params?.eventId;
  const listName = params?.listName ?? '';
  const hasEventContext = !!eventId;

  const {
    invitingTalentId,
    handleInvite,
    yellowFlagModal,
    closeYellowFlagModal,
    confirmYellowFlagModal,
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
              onInvite={handleInvitePress}
              onRemove={handleRemove}
              showInviteAction={hasEventContext}
            />
          )}
          emptyText="No talents found"
        />
      </If>

      <If condition={!hasTalents && !isLoading}>
        <CustomTalentsListEmptyState
          listId={listId}
          listName={listName}
        />
      </If>

      <If condition={hasEventContext}>
        <YellowFlagInviteWarningModal
          isVisible={yellowFlagModal?.visible ?? false}
          flag={yellowFlagModal?.flag ?? null}
          onClose={closeYellowFlagModal}
          onConfirm={confirmYellowFlagModal}
          isInviting={!!invitingTalentId}
        />
      </If>
    </ScreenWrapper>
  );
};
