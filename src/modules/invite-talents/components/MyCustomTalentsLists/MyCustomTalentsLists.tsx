import { useState, useRef } from 'react';

import { ICONS } from '@assets';
import { AppButton } from '@ui';
import { AppFlashList } from '@components';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import {
  useCreateCustomList,
  useGetCustomLists,
  useUpdateCustomListName,
  useDeleteCustomList,
} from '@actions';
import {
  ActionConfirmationModal,
  ActionConfirmationModalRef,
} from '@modules/common';

import { CreateEditCustomList } from '../../modals';
import { CustomTalentsListCard, CustomListsSkeleton } from '../../ui';
import { styles } from './styles';

export const MyCustomTalentsLists = () => {
  const { params } = useScreenNavigation<Screens.CustomTalentsList>();
  const eventId = params?.eventId ?? '';

  const [isCreateListModalVisible, setIsCreateListModalVisible] =
    useState(false);
  const [editingList, setEditingList] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const actionConfirmationModalRef = useRef<ActionConfirmationModalRef>(null);

  const { data: customLists, isLoading } = useGetCustomLists();
  const { mutate: createList, isPending: isCreating } = useCreateCustomList();
  const { mutate: updateListName, isPending: isUpdating } =
    useUpdateCustomListName();
  const { mutate: deleteList } = useDeleteCustomList();

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

  const handleUpdateListName = (listName: string) => {
    if (!listName.trim() || !editingList) {
      return;
    }

    updateListName(
      {
        listId: editingList.id,
        eventId,
        name: listName.trim(),
      },
      {
        onSuccess: () => {
          setEditingList(null);
        },
      },
    );
  };

  const handleDeleteList = (listId: string) => {
    deleteList(
      {
        listId,
        eventId,
      },
      {
        onSuccess: () => {
          // Modal will close automatically
        },
      },
    );
  };

  const handleMenuSelect = (value: string, listId: string, listName: string) => {
    if (value === 'edit_name') {
      setEditingList({ id: listId, name: listName });
    } else if (value === 'delete_list') {
      actionConfirmationModalRef.current?.open({
        title: 'Delete List',
        subtitle: `Are you sure you want to delete "${listName}"?`,
        onConfirm: async () => {
          handleDeleteList(listId);
        },
      });
    }
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
            listId={item.id}
            eventId={eventId}
            onPress={() =>
              goToScreen(Screens.CustomTalentsList, {
                listName: item.listName,
                listId: item.id,
                eventId: eventId,
              })
            }
            onMenuSelect={(value) => handleMenuSelect(value, item.id, item.listName)}
          />
        )}
        emptyText="No talents lists found"
      />

      <CreateEditCustomList
        isVisible={isCreateListModalVisible}
        onClose={() => setIsCreateListModalVisible(false)}
        onConfirm={handleCreateList}
        isLoading={isCreating}
      />

      <CreateEditCustomList
        isVisible={!!editingList}
        onClose={() => setEditingList(null)}
        onConfirm={handleUpdateListName}
        isLoading={isUpdating}
        initialValue={editingList?.name || ''}
        isEdit={true}
      />

      <ActionConfirmationModal ref={actionConfirmationModalRef} />
    </>
  );
};
