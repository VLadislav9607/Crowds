import { COLORS } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.black,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    headerContent: {
        gap:12,
        alignItems: 'center'
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black,
    },
    fullScreenCamera: {
        flex: 1,
        width: '100%',
    },
});