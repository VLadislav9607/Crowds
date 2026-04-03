import { useEffect, useRef } from 'react';
import { Platform, SectionList } from 'react-native';

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
      const delay = Platform.OS === 'android' ? 100 : 0;
      const timer = setTimeout(() => {
        listRef.current?.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
          viewOffset: 0,
          animated: true,
        });
      }, delay);

      return () => clearTimeout(timer);
    }

    prevCountRef.current = nextCount;
  }, [sections, listRef]);
};
