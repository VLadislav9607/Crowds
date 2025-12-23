import { DIMENSIONS } from "@constants";
import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "@styles";

export const styles = StyleSheet.create({
    baseToast: {
        flexDirection: "row",
        width: DIMENSIONS.width * 0.9,
        alignItems: "center",
        margin: 10,
        gap: 0,
        borderRadius: 10,
        zIndex: 20000,
        backgroundColor: COLORS.white,
        minHeight: 56,
        ...SHADOWS.card
    },
    baseToastContent: {
       padding: 12,
       flex: 1,
       flexDirection: 'column',
       alignItems: 'flex-start',
       justifyContent: 'center',
    },
    statusBadge:{
        width: 10,
        height: '100%',
        backgroundColor: COLORS.green,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    successBadge: {
        backgroundColor: COLORS.green,
    },
    errorBadge: {
        backgroundColor: COLORS.red,
    },
    infoBadge: {
        backgroundColor: COLORS.main,
    },
    warningBadge: {
        backgroundColor: COLORS.yellow,
    },
    baseToastText: {
        flexShrink: 1,
    },
});
