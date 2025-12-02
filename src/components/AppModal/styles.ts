import { COLORS } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 14,
        paddingHorizontal: 24,
        paddingTop:48,
        paddingBottom:24,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 26,
        height: 26,
        borderRadius: 100,
        backgroundColor:COLORS.white,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 3,
    },
    title: {
        marginBottom: 6,
    },
    subtitle: {
        marginBottom: 24,
    },
});