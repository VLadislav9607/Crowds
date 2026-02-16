import { useMemo } from 'react';
import { TalentFlag } from '@modules/common';
import { formatDate } from '@utils';
import { useGetOrgFlags } from '@actions';

import { IFlagNote } from '../../screens/FlagParticipant/types';

export const useOrgFlagsNotes = (officeId: string) => {
  const query = useGetOrgFlags({ officeId });

  const notes = useMemo<IFlagNote[]>(() => {
    const items = query.data?.data ?? [];

    return items.map(note => ({
      id: note.id,
      date: formatDate(note.created_at, 'MMM dd, yyyy'),
      eventName: note.created_by_name ?? '',
      eventTitle: note.event_name ?? undefined,
      title: note.reason ?? note.flag_type,
      description: note.description ?? undefined,
      flag: (note.flag_type as TalentFlag) ?? TalentFlag.YELLOW,
    }));
  }, [query.data?.data]);

  const brandId = query.data?.data?.[0]?.brand_id ?? '';

  return {
    ...query,
    notes,
    brandId,
  };
};
