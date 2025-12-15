import { If, ScreenWrapper } from "@components";
import { View, Alert, Linking, ActivityIndicator } from "react-native";
import { AppButton, AppText } from "@ui";
import { styles } from "./styles";
import { useState, useEffect, useRef } from "react";
import {
    Camera,
    useCameraDevice,
    useCodeScanner,
} from "react-native-vision-camera";
import { usePermissions, EPermissionTypes } from "@hooks";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "@styles";

export const QRCodeScanTab = () => {
    const [hasPermission, setHasPermission] = useState<boolean>();
    const [isScanningPaused, setIsScanningPaused] = useState(false);
    const camera = useRef<Camera>(null);
    const device = useCameraDevice("back");
    const { askPermissions } = usePermissions(EPermissionTypes.CAMERA);
    const isFocused = useIsFocused();

    // Camera is active only when the screen is focused and scanning is not paused
    const isActive = isFocused && !isScanningPaused;

    const codeScanner = useCodeScanner({
        codeTypes: ["qr", "ean-13"],
        onCodeScanned: (codes) => {
            if (codes.length > 0 && !isScanningPaused) {
                const scannedCode = codes[0].value;
                setIsScanningPaused(true);
                Alert.alert("QR Code Scanned", scannedCode, [
                    {
                        text: "OK",
                        onPress: () => {
                            setIsScanningPaused(false);
                        },
                    },
                ]);
            }
        },
    });

    useEffect(() => {
        const requestCameraPermission = async () => {
            try {
                const result = await askPermissions();
                setHasPermission(result.type === "granted" || result.type === "limited");
            } catch {
                setHasPermission(false);
            }
        };

        requestCameraPermission();
    }, [askPermissions]);

    return (
        <ScreenWrapper
            headerVariant="empty"
            headerStyles={styles.header}
            customElement={
                <View style={styles.headerContent}>
                    <AppText color="white" typography="bold_24">
                        Scan QR
                    </AppText>
                    <AppText color="gray" typography="regular_14">
                        Scan the QR to check in or check out from events
                    </AppText>
                </View>
            }
        >

            <If condition={hasPermission === undefined}>
                <View style={styles.cameraContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                </View>
            </If>

            <If condition={hasPermission === true && !!device}>
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={camera}
                        photo={false}
                        style={styles.fullScreenCamera}
                        device={device!}
                        codeScanner={codeScanner}
                        isActive={isActive}
                    />
                </View>
            </If>

            <If condition={!device}>
                <View style={styles.cameraContainer}>
                    <AppText color="gray" typography="regular_16">
                        Camera not found
                    </AppText>
                </View>
            </If>

            <If condition={hasPermission === false}>
                <View style={styles.cameraContainer}>
                    <AppText color="gray" typography="regular_16">
                        Camera permission is required
                    </AppText>
                    <AppButton title="Open Settings" onPress={() => Linking.openURL('app-settings:')} />
                </View>
            </If>

        </ScreenWrapper>
    );
};
