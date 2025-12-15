export type TabSelectorTheme = 'white' | 'black';

export interface ITabOption<T = string> {
  label: string;
  value: T;
  badge?: number;
}

export interface IAppTabSelectorProps<T = string> {
  options: ITabOption<T>[];
  selectedValue:  T;
  onSelect: (value: T) => void;
  label?: string;
  badgeLabel?: string;
  theme?: TabSelectorTheme;
}