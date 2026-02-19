import { NotificationItem } from '@actions';

export interface NotificationItemProps {
  item: NotificationItem;
  onPress: (item: NotificationItem) => void;
  onDelete: (id: string) => void;
}
