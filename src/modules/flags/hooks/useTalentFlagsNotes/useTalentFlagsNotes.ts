import { useMemo } from 'react';
import { TalentFlag } from '@modules/common';
import { formatDate } from '@utils';
import { useGetTalentFlags } from '@actions';

import { IFlagNote } from '../../screens/FlagParticipant/types';

export const useTalentFlagsNotes = (talentId: string) => {
  const query = useGetTalentFlags({ talentId });

  const notes = useMemo<IFlagNote[]>(() => {
    const items = query.data?.data ?? [];

    return items.map(note => ({
      id: note.id,
      date: formatDate(note.created_at, 'MMM dd, yyyy'),
      eventName: note.brand_name ?? '',
      title: note.reason ?? note.flag_type,
      description: note.description ?? undefined,
      flag: (note.flag_type as TalentFlag) ?? TalentFlag.YELLOW,
    }));
  }, [query.data?.data]);

  return {
    ...query,
    notes,
  };
};
