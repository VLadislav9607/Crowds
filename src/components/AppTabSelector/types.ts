export interface ITabOption {
  label: string;
  value: string;
}

export interface IAppTabSelectorProps {
  options: ITabOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label?: string;
  badgeLabel?: string;
}
