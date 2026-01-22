import { AppFlashList } from '@components';
import { AppButton, IconButton } from '@ui';
import { ICONS } from '@assets';
import { TalentProfileRow, TalentsListSkeleton } from '@modules/common';

import { AddTalentsListProps } from './types';
import { styles } from './styles';

export const AddTalentsList = ({
  data,
  onEndReached,
  hasNextPage,
  isFetchingNextPage,
  onPressRightAction,
  actionTalentId,
  isLoading,
}: AddTalentsListProps) => {

  const renderRightAction = (talentId: string, isInList: boolean) => {
    return (
     isInList ? (
        <IconButton
          icon={ICONS.checked('green')}
          iconSize={14}
          style={styles.addedButton}
        />
      ) : (
        <AppButton
          title="Add"
          isLoading={actionTalentId === talentId}
          onPress={() => onPressRightAction(talentId)}
          size="36"
          width={71}
        />
      )
    );
};
  
  const skeleton = isLoading ? <TalentsListSkeleton /> : undefined;

  return (
    <AppFlashList
      data={data}
      emptyText="No talents found"
      gap={0}
      showBottomLoader={isFetchingNextPage}
      skeleton={skeleton}
      onEndReached={hasNextPage ? onEndReached : undefined}
      renderItem={({ item }) => (
        <TalentProfileRow
          talent={item}
          popUpItems={[{label: 'Report', value: 'report'}]}
          onMenuSelect={() => {}}
          renderRightAction={() => renderRightAction(item.talentId, item.isInList)}
        />
      )}
    />
  );
};
