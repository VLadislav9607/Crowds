interface IGridBoardItem {
  title: string;
  subTitle?: string;
  label?: string;
  count: number;
  bgColor: string;
  textColor: string;
  showSkeleton?: boolean;
  onPress?: () => void;
}

export interface IGridBoardProps {
  items: IGridBoardItem[];
}
