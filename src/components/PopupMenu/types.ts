export interface IPopupMenuProviderProps {
  children: React.ReactNode;
}

export interface IPopupMenuItem {
  label: string;
  value: string;
  onPress?: () => void;
}

export interface IPopupPosition {
  x: number;
  y: number;
}

export interface IPopupMenuConfig {
  items: IPopupMenuItem[];
  position: IPopupPosition;
  onSelect?: (item: IPopupMenuItem) => void;
}
