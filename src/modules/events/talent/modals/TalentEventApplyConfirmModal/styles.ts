import { COLORS } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    eventContainer: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 10,
        paddingHorizontal: 14,
        marginBottom: 14
    },
    eventContainerSubmitted: {
        marginTop: 24,
    },
    eventContainerNotSubmitted: {
        marginTop: 32,
    },
    cancelButton: {
        marginBottom: 10
    }
});
