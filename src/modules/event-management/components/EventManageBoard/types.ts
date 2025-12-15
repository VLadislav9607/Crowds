export interface IEventManageBoardProps {
  onOpenEditCheckIn: () => void;
}

export interface IBoardConfig {
  type: BoardItemType;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  borderWidth?: number;
  value?: string;
}

export enum BoardItemType {
  CURRENT_TIME = 'current_time',
  CHECK_IN_CUTOFF = 'check_in_cutoff',
  CHECKED_IN = 'checked_in',
  MISSING = 'missing',
}
