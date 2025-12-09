interface IGridBoardItem {
  title: string;
  subTitle?: string;
  label: string;
  count: number;
  bgColor: string;
  textColor: string;
  onPress?: () => void;
}

export interface IGridBoardProps {
  items: IGridBoardItem[];
}
