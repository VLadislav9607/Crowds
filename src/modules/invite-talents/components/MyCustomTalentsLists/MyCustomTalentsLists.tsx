import { useState } from 'react';

import { ICONS } from '@assets';
import { AppButton } from '@ui';
import { AppFlashList } from '@components';
import { goToScreen, Screens } from '@navigation';

import { CreateInvitedTalentsListModal } from '../../modals';
import { CustomTalentsListCard } from '../../ui';
import { styles } from './styles';
import { MyCustomTalentsListsProps } from './types';

export const MyCustomTalentsLists = ({ lists }: MyCustomTalentsListsProps) => {
  const [isCreateListModalVisible, setIsCreateListModalVisible] =
    useState(false);

  const handleInviteAll = (listId: string) => {
    console.log('Invite all from list:', listId);
  };

  return (
    <>
      <AppButton
        title="CREATE LIST"
        icon={ICONS.plus('white')}
        iconPlace="left"
        onPress={() => setIsCreateListModalVisible(true)}
        variant="primary"
        size="31"
        wrapperStyles={styles.createListButton}
      />

      <AppFlashList
        data={lists}
        gap={8}
        renderItem={({ item }) => (
          <CustomTalentsListCard
            key={item.id}
            listName={item.listName}
            countTalents={item.countTalents}
            onInviteAll={() => handleInviteAll(item.id)}
            onPress={() =>
              goToScreen(Screens.CustomTalentsList, {
                listName: item.listName,
                listId: item.id,
              })
            }
          />
        )}
        emptyText="No talents lists found"
      />

      <CreateInvitedTalentsListModal
        isVisible={isCreateListModalVisible}
        onClose={() => setIsCreateListModalVisible(false)}
        onConfirm={() => setIsCreateListModalVisible(false)}
      />
    </>
  );
};
