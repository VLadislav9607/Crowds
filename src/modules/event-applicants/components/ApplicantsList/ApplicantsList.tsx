import { View } from 'react-native';
import { AppFlashList } from '@components';
import { TalentProfileRow } from '@modules/common';
import { AppButton, IconButton } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';
import { ApplicantsListProps } from './types';

export const ApplicantsList = ({
  data,
  variant,
  hasNextPage,
  isFetchingNextPage,
  isAccepting = false,
  isRejecting = false,
  onEndReached,
  handlePressMessage,
  handleAccept,
  handleDecline,
}: ApplicantsListProps) => {
  const renderRightAction = (talentId: string, participationId: string) => {
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
              onPress={() => handleAccept(participationId)}
            />
            <IconButton
              isLoading={isRejecting}
              style={styles.declineButton}
              icon={ICONS.closeIcon('white', 1)}
              onPress={() => handleDecline(participationId)}
            />
          </View>
        );
      case 'approved':
        return (
          <AppButton
            icon={ICONS.chats('black')}
            title="Message"
            onPress={() => handlePressMessage(talentId)}
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

  return (
    <AppFlashList
      data={data}
      emptyText="No applicants found"
      gap={0}
      showBottomLoader={isFetchingNextPage}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <TalentProfileRow
          talent={item}
          onMenuSelect={() => {}}
          popUpItems={[{ label: 'Report', value: 'report' }]}
          renderRightAction={() =>
            renderRightAction(item.talentId, item.participationId)
          }
        />
      )}
      onEndReached={hasNextPage ? onEndReached : undefined}
    />
  );
};
