export interface IEventManageBoardProps {
  checkinOpensAt: string | null;
  checkinClosesAt: string | null;
  timezone: string;
  isBumpInPassed: boolean;
  hasAnyCheckins: boolean;
  isUpdating: boolean;
  onOpenEditBumpIn: () => void;
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
  CHECKIN_OPENS = 'checkin_opens',
  CHECKIN_CLOSES = 'checkin_closes',
  CHECKED_IN = 'checked_in',
  MISSING = 'missing',
}
