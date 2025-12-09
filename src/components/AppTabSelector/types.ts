export type TabSelectorTheme = 'white' | 'black';

export interface ITabOption {
  label: string;
  value: string;
  badge?: number;
}

export interface IAppTabSelectorProps {
  options: ITabOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label?: string;
  badgeLabel?: string;
  theme?: TabSelectorTheme;
}
