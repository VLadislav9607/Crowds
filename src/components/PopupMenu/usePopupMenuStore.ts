import { create } from 'zustand';

import { IPopupMenuConfig, IPopupMenuItem, IPopupPosition } from './types';

interface PopupMenuState {
  visible: boolean;
  items: IPopupMenuItem[];
  position: IPopupPosition;
  onSelect?: (item: IPopupMenuItem) => void;
  showPopup: (config: IPopupMenuConfig) => void;
  hidePopup: () => void;
}

export const usePopupMenuStore = create<PopupMenuState>(set => ({
  visible: false,
  items: [],
  position: { x: 0, y: 0 },
  onSelect: undefined,

  showPopup: (config: IPopupMenuConfig) =>
    set({
      visible: true,
      items: config.items,
      position: config.position,
      onSelect: config.onSelect,
    }),

  hidePopup: () =>
    set({
      visible: false,
      items: [],
      onSelect: undefined,
    }),
}));

export const usePopupMenu = () => {
  const showPopup = usePopupMenuStore(state => state.showPopup);
  const hidePopup = usePopupMenuStore(state => state.hidePopup);
  return { showPopup, hidePopup };
};
