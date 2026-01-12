import { RefObject, useImperativeHandle, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const useBottomSheetData = <T>(
  ref?: RefObject<BottomSheetModal<T> | null>,
  defaultValue?: T,
) => {
  const modalRef = useRef<BottomSheetModal<T> | null>(null);
  const [data, setData] = useState<T | null>(defaultValue || null);
  useImperativeHandle(
    ref,
    () => ({
      present: presentData => {
        const nextEntry = presentData ?? defaultValue;
        setData(nextEntry || null);
        modalRef.current?.present(presentData);
      },
      dismiss: conf => modalRef.current?.dismiss(conf),
      snapToIndex: (index, conf) => modalRef.current?.snapToIndex(index, conf),
      snapToPosition: (position, conf) =>
        modalRef.current?.snapToPosition(position, conf),
      expand: conf => modalRef.current?.expand(conf),
      collapse: conf => modalRef.current?.collapse(conf),
      close: conf => modalRef.current?.close(conf),
      forceClose: conf => modalRef.current?.forceClose(conf),
    }),
    [defaultValue],
  );
  return { data, setData, modalRef };
};
