import { IMessageData } from '../ui';

export const getMessagePosition = (data: IMessageData[], index: number) => {
  const current = data[index];
  const prev = data[index - 1];
  const next = data[index + 1];

  const isFirst =
    !prev || prev.senderName !== current.senderName || !!current.showTime;
  const isLast =
    !next || next.senderName !== current.senderName || !!next.showTime;

  return { isFirst, isLast };
};

