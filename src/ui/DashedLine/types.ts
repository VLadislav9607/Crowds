import { ColorsKeys } from "@styles";
import { ViewStyle } from "react-native";

export interface DashedLineProps {
    containerStyle?: ViewStyle;
    strokeWidth?: number;
    color?: ColorsKeys;
    strokeDasharray?:string;
}
