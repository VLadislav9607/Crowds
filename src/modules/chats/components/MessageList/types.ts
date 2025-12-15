import { IMessageData } from '../../ui';

export interface IMessageSection {
  title: string;
  data: IMessageData[];
}

export interface IMessageListProps {
  sections: IMessageSection[];
}

export interface IMessageRenderItemProps {
  item: IMessageData;
  index: number;
  section: IMessageSection;
}
