import { View } from 'react-native';
import { AppFlashList } from '@components';
import {
  IEventParticipant,
  TalentProfileRow,
  TalentsListSkeleton,
} from '@modules/common';
import { AppButton, IconButton } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';
import { ApplicantsListProps } from './types';

export const ApplicantsList = ({
  data,
  variant,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isAccepting = false,
  isRejecting = false,
  isCreatingChat = false,
  onEndReached,
  handlePressMessage,
  handleAccept,
  handleDecline,
}: ApplicantsListProps) => {
  const renderRightAction = (talent: IEventParticipant) => {
    switch (variant) {
      case 'invited':
        return <></>;
      case 'applied':
        return (
          <View style={styles.appliedAction}>
            <IconButton
              isLoading={isAccepting}
              style={styles.acceptButton}
              icon={ICONS.checked('white')}
              onPress={() => handleAccept(talent.participationId ?? '')}
            />
            <IconButton
              isLoading={isRejecting}
              style={styles.declineButton}
              icon={ICONS.closeIcon('white', 1)}
              onPress={() => handleDecline(talent.participationId ?? '')}
            />
          </View>
        );
      case 'approved':
        return (
          <AppButton
            icon={ICONS.chats('black')}
            title="Message"
            isLoading={isCreatingChat}
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
          onMenuSelect={() => {}}
          popUpItems={[{ label: 'Report', value: 'report' }]}
          renderRightAction={() => renderRightAction(item)}
        />
      )}
      onEndReached={hasNextPage ? onEndReached : undefined}
    />
  );
};
