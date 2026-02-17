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
          popUpItems={[{ label: 'Report', value: 'report' }]}
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
