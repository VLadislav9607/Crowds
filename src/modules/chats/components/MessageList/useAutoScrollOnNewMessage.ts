import { useEffect, useRef } from 'react';
import { InteractionManager, SectionList } from 'react-native';

import type { IMessageSection } from './types';
import type { IMessageData } from '../../ui';

type UseAutoScrollOnNewMessageParams = {
  sections: IMessageSection[];
  listRef: React.RefObject<SectionList<IMessageData, IMessageSection> | null>;
};

export const useAutoScrollOnNewMessage = ({
  sections,
  listRef,
}: UseAutoScrollOnNewMessageParams) => {
  const prevCountRef = useRef<number | null>(null);

  useEffect(() => {
    const nextCount = sections.reduce(
      (total, section) => total + section.data.length,
      0,
    );

    if (prevCountRef.current !== null && nextCount > prevCountRef.current) {
      const task = InteractionManager.runAfterInteractions(() => {
        listRef.current?.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
          viewOffset: 0,
          animated: true,
        });
      });

      return () => task.cancel();
    }

    prevCountRef.current = nextCount;
  }, [sections, listRef]);
};
