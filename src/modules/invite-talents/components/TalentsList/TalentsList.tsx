import { AppFlashList } from '@components';
import { TalentProfileRow } from '@modules/common';

import { TalentsListProps, INVITE_TALENT_POPUP_ITEMS } from './types';
import { AppButton } from '@ui';

export const TalentsList = ({
  data,
  onEndReached,
  hasNextPage,
  isFetchingNextPage,
  onPressRightAction,
  invitingTalentId,
}: TalentsListProps) => {
  return (
    <AppFlashList
      data={data}
      emptyText="No talents found"
      gap={0}
      showBottomLoader={isFetchingNextPage}
      renderItem={({ item }) => (
        <TalentProfileRow
          talent={item}
          popUpItems={INVITE_TALENT_POPUP_ITEMS}
          onMenuSelect={() => {}}
          renderRightAction={() => (
            <AppButton
              title="Invite"
              isLoading={invitingTalentId === item.talentId}
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
