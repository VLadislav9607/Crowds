import { StyleProp, ViewStyle } from "react-native";
import { TalentEventStatus } from "../../../types";


export interface TalentEventCardCompactProps {
    containerStyle?: StyleProp<ViewStyle>;
    type?: TalentEventStatus;
}