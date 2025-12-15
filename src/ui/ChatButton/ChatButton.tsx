import { TouchableOpacity, View } from "react-native";
import { ChatButtonProps } from "./types";
import { styles } from "./styles";
import { ICONS } from "@assets";
import { SvgXml } from "react-native-svg";
import { AppText } from "@ui";

export const ChatButton = ({ topText, bottomText, ...props }: ChatButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={0.5} {...props} style={[styles.container, props.style]}>
            <SvgXml xml={ICONS.chatSquare('main')} width={30} height={30} />

            <View style={styles.textWrapper}>
                <View>
                    <AppText typography="regular_14" color="black">{topText}</AppText>
                    <AppText typography="semibold_18" color="black">{bottomText}</AppText>
                </View>
                <SvgXml xml={ICONS.chevronRight('main')} width={28} height={28} />
            </View>

        </TouchableOpacity>
    );
};