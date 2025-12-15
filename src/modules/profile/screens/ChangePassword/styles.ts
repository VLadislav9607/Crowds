import { DIMENSIONS } from "@constants";
import { COLORS } from "@styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    headerStyles: {
        backgroundColor: COLORS.black,
    },
    formContainer: {
        paddingHorizontal: 22,
        paddingTop: 20,
    },
    changePasswordButton: {
        marginHorizontal: 20,
        width: DIMENSIONS.width - 40,
    },
});
