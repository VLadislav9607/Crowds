import { StyleProp, ViewStyle } from "react-native";

export type EventDetailsTextBlockProps = {
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
  showSkeleton?: boolean;
  label:string;
};

export type EventDetailsCardWithMapProps = {
  showSkeleton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export type EventDetailsCardWithoutMapProps = {
  showSkeleton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export type EventDetailsRequirementsProps = {
  showSkeleton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  requirements?: Array<{
    title: string;
    options: string[];
  }>;
};

export type EventDetailsTagsProps = {
  showSkeleton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  tags?:string[];
};

