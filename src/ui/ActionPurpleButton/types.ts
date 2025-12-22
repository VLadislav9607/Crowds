import { TouchableOpacityProps } from "react-native";

export interface ActionPurpleButtonProps extends TouchableOpacityProps {
    titleIcon?: string | null;
    icon?: string | null;
    title?: string;
    titleIconSize?: number;
    iconSize?: number;
    description?: string;
}