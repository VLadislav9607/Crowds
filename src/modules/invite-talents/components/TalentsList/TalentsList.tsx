import { AppFlashList } from '@components';
import { TalentProfileRow, TalentsListSkeleton } from '@modules/common';
import { AppButton } from '@ui';
import { goToScreen, Screens } from '@navigation';

import { TalentsListProps } from './types';
import { InviteStatusBadge } from '../../ui';

export const TalentsList = ({
  data,
  onEndReached,
  hasNextPage,
  isFetchingNextPage,
  onPressRightAction,
  actionTalentId,
  isLoading,
  isRegistrationClosed,
}: TalentsListProps) => {
  const skeleton = isLoading ? <TalentsListSkeleton /> : undefined;

  const renderRightAction = (item: TalentsListProps['data'][number]) => {
    if (item.status) {
      return <InviteStatusBadge status={item.status} />;
    }
    return (
      <AppButton
        title="Invite"
        isLoading={actionTalentId === item.talentId}
        onPress={() => onPressRightAction(item.talentId)}
        size="36"
        width={71}
        disabled={isRegistrationClosed}
      />
    );
  };

  return (
    <AppFlashList
      data={data}
      emptyText="No talents found"
      gap={0}
      showBottomLoader={isFetchingNextPage}
      skeleton={skeleton}
      renderItem={({ item }) => (
        <TalentProfileRow
          talent={item}
          popUpItems={[{ label: 'Add flag', value: 'add_flag' }]}
          onMenuSelect={() => {}}
          onPressCard={() =>
            goToScreen(Screens.TalentProfile, {
              talentId: item.talentId,
            })
          }
          renderRightAction={() => renderRightAction(item)}
        />
      )}
      onEndReached={hasNextPage ? onEndReached : undefined}
    />
  );
};
