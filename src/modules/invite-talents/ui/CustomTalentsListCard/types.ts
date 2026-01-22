import { IPopupMenuItem } from "@components";

export interface CustomTalentsListCardProps {
  listName: string;
  countTalents: number;
  onPress: () => void;
  onMenuSelect: (value: string) => void;
  listId: string;
  eventId: string;
}

export const POPUP_ITEMS_CUSTOM_LIST_CARD: IPopupMenuItem[] = [
  {
    label: 'Edit name',
    value: 'edit_name',
  },
  {
    label: 'Delete list',
    value: 'delete_list',
  },
];