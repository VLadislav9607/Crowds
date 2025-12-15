import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AppText } from "../AppText";
import { SvgXml } from 'react-native-svg';
import { ActionPurpleButtonProps } from "./types";
import { If } from "@components";

export const ActionPurpleButton = ({ titleIcon = null, icon = null, title = 'Action', iconSize = 28 , titleIconSize = 28, ...props }: ActionPurpleButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={0.5} {...props} style={[styles.container, props.style]}>
            <View style={styles.textWrapper}>
                <AppText typography="bold_14" color="main">{title}</AppText>

                <If condition={!!titleIcon}>
                    <SvgXml xml={titleIcon} width={titleIconSize} height={titleIconSize} />
                </If>
            </View>

            <If condition={!!icon}>
                <SvgXml xml={icon} width={iconSize} height={iconSize}  />
            </If>
        </TouchableOpacity>
    );
};