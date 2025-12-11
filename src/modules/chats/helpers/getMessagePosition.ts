import { IMessageData } from '../ui';

export const getMessagePosition = (data: IMessageData[], index: number) => {
  const current = data[index];
  const prev = data[index - 1];
  const next = data[index + 1];

  const isFirst = !prev || prev.sender !== current.sender || !!current.showTime;
  const isLast = !next || next.sender !== current.sender || !!next.showTime;

  return { isFirst, isLast };
};

