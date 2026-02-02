import { ChatType } from '@actions';
import { IMessageData } from '../../ui';

export interface IMessageSection {
  title: string;
  data: IMessageData[];
}

export interface IMessageListProps {
  sections: IMessageSection[];
  isLoading?: boolean;
  chatType: ChatType;
  isTalent: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

export interface IMessageRenderItemProps {
  item: IMessageData;
  index: number;
  section: IMessageSection;
}
