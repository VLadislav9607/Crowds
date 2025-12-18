export type TabSelectorTheme = 'white' | 'black';
export type TabSelectorVariant = 'default' | 'pill';

export interface ITabOption<T = string> {
  label: string;
  value: T;
  badge?: number;
}

export interface IAppTabSelectorProps<T = string> {
  options: ITabOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  label?: string;
  badgeLabel?: string;
  theme?: TabSelectorTheme;
  variant?: TabSelectorVariant;
  marginBottom?: number;
}
