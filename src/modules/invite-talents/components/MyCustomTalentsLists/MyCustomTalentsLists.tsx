import { useState } from 'react';

import { ICONS } from '@assets';
import { AppButton } from '@ui';
import { AppFlashList } from '@components';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { useCreateCustomList, useGetCustomLists } from '@actions';

import { CreateInvitedTalentsListModal } from '../../modals';
import { CustomTalentsListCard, CustomListsSkeleton } from '../../ui';
import { styles } from './styles';

export const MyCustomTalentsLists = () => {
  const { params } = useScreenNavigation<Screens.CustomTalentsList>();

  const [isCreateListModalVisible, setIsCreateListModalVisible] =
    useState(false);

  const { data: customLists, isLoading } = useGetCustomLists();
  const { mutate: createList, isPending: isCreating } = useCreateCustomList();

  const handleCreateList = (listName: string) => {
    if (!listName.trim()) {
      return;
    }

    createList(
      { listName: listName.trim() },
      {
        onSuccess: () => {
          setIsCreateListModalVisible(false);
        },
      },
    );
  };

  const lists = (customLists || []).map(list => ({
    id: list.id,
    listName: list.name,
    countTalents: list.members_count,
  }));

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
        skeleton={isLoading ? <CustomListsSkeleton /> : undefined}
        renderItem={({ item }) => (
          <CustomTalentsListCard
            key={item.id}
            listName={item.listName}
            countTalents={item.countTalents}
            onPress={() =>
              goToScreen(Screens.CustomTalentsList, {
                listName: item.listName,
                listId: item.id,
                eventId: params?.eventId ?? '',
              })
            }
          />
        )}
        emptyText="No talents lists found"
      />

      <CreateInvitedTalentsListModal
        isVisible={isCreateListModalVisible}
        onClose={() => setIsCreateListModalVisible(false)}
        onConfirm={handleCreateList}
        isLoading={isCreating}
      />
    </>
  );
};
