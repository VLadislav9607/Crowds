import { ReactNode } from 'react';
import { AppTextProps } from '../AppText/types';
import { StyleProp, ViewStyle } from 'react-native';

export interface IGridBoardItem {
  title: string;
  subTitle?: string;
  label?: string;
  count?: number;
  countElement?: ReactNode;
  bgColor: string;
  textColor: string;
  showSkeleton?: boolean;
  labelElement?: ReactNode;
  onPress?: () => void;
}

export interface IGridBoardProps {
  items: IGridBoardItem[];
  counterProps?: Partial<AppTextProps>;
  showSkeleton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
