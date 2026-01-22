import { AppFlashList } from '@components';
import { TalentProfileRow,TalentsListSkeleton } from '@modules/common';
import { AppButton } from '@ui';

import { TalentsListProps } from './types';

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
          popUpItems={[{label: 'Report', value: 'report'}]}
          onMenuSelect={() => {}}
          renderRightAction={() => (
            <AppButton
              title="Invite"
              isLoading={actionTalentId === item.talentId}
              onPress={() => onPressRightAction(item.talentId)}
              size="36"
              width={71}
            />
          )}
        />
      )}
      onEndReached={hasNextPage ? onEndReached : undefined}
    />
  );
};
