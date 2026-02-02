import { useState } from 'react';
import { useAddTalentToCustomList as useAddTalentToCustomListAction } from '@actions';

export const useAddTalentToCustomList = (eventId: string, listId: string) => {
  const [addingTalentId, setAddingTalentId] = useState<string | null>(null);

  const { mutate: addTalent } = useAddTalentToCustomListAction(
    eventId,
    listId,
    {
      onSuccess: () => {
        setAddingTalentId(null);
      },
      onError: () => {
        setAddingTalentId(null);
      },
    },
  );

  const handleAddTalent = (talentId: string) => {
    setAddingTalentId(talentId);
    addTalent({
      p_list_id: listId,
      p_talent_id: talentId,
    });
  };

  return {
    addingTalentId,
    handleAddTalent,
  };
};
