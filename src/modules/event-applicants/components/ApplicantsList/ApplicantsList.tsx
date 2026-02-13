import { View } from 'react-native';
import { AppFlashList } from '@components';
import {
  IEventParticipant,
  TalentProfileRow,
  TalentsListSkeleton,
} from '@modules/common';
import { goToScreen, Screens } from '@navigation';
import { AppButton, IconButton } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';
import { ApplicantsListProps } from './types';

export const ApplicantsList = ({
  data,
  variant,
  selectedTalentId,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isAccepting = false,
  isRejecting = false,
  isCreatingChat = false,
  popUpItems,
  onEndReached,
  handlePressMessage,
  handleAccept,
  handleDecline,
}: ApplicantsListProps) => {
  const renderRightAction = (talent: IEventParticipant) => {
    const isSelected = talent.talentId === selectedTalentId;

    switch (variant) {
      case 'invited':
        return <></>;
      case 'applied':
        return (
          <View style={styles.appliedAction}>
            <IconButton
              isLoading={isSelected && isAccepting}
              style={styles.acceptButton}
              icon={ICONS.checked('white')}
              onPress={() =>
                handleAccept(talent.participationId ?? '', talent.talentId)
              }
            />
            <IconButton
              isLoading={isSelected && isRejecting}
              style={styles.declineButton}
              icon={ICONS.closeIcon('white', 1)}
              onPress={() =>
                handleDecline(talent.participationId ?? '', talent.talentId)
              }
            />
          </View>
        );
      case 'approved':
        return (
          <AppButton
            icon={ICONS.chats('black')}
            title="Message"
            isLoading={isSelected && isCreatingChat}
            onPress={() => handlePressMessage(talent)}
            size="28"
            wrapperStyles={styles.messageButton}
            titleStyles={styles.messageButtonText}
            width={94}
          />
        );
      case 'rejected':
        return <></>;
    }
  };

  const skeleton = isLoading ? <TalentsListSkeleton /> : undefined;

  return (
    <AppFlashList
      data={data}
      emptyText="No applicants found"
      gap={0}
      skeleton={skeleton}
      showBottomLoader={isFetchingNextPage}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <TalentProfileRow
          talent={item}
          onPressCard={() =>
            goToScreen(Screens.ApplicantProfile, {
              applicantId: item.talentId,
            })
          }
          onMenuSelect={() => {}}
          popUpItems={popUpItems(item)}
          renderRightAction={() => renderRightAction(item)}
        />
      )}
      onEndReached={hasNextPage ? onEndReached : undefined}
    />
  );
};
