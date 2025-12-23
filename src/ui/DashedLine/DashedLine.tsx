import { View } from "react-native";
import Svg, { Line } from "react-native-svg";
import { COLORS } from "@styles";
import { styles } from "./styles";
import { DashedLineProps } from "./types";

export const DashedLine = ({ containerStyle, strokeWidth = 1, color = 'black_50', strokeDasharray = '8 4' }: DashedLineProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
        <Svg height={strokeWidth} width='100%'>
            <Line
                x1="0"
                y1="1"
                x2='100%'
                y2="1"
                stroke={COLORS[color]}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
            />
        </Svg>
    </View>
    );
};