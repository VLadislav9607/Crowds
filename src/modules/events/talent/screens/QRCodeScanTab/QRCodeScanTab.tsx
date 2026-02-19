import { If, ScreenWrapper } from '@components';
import { View, Linking, ActivityIndicator } from 'react-native';
import { AppButton, AppText } from '@ui';
import { styles } from './styles';
import { useState, useEffect, useRef } from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { usePermissions, EPermissionTypes } from '@hooks';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '@styles';
import { useScanEventQRByTalent, ScanEventQRByTalentResDto } from '@actions';
import { showMutationErrorToast } from '@helpers';
import {
  TalentEventCheckinModal,
  TalentEventCheckinModalRef,
  TalentEventCheckoutModal,
  TalentEventCheckoutModalRef,
} from '../../modals';

export const QRCodeScanTab = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const { askPermissions } = usePermissions(EPermissionTypes.CAMERA);
  const isFocused = useIsFocused();

  const checkinModalRef = useRef<TalentEventCheckinModalRef>(null);
  const checkoutModalRef = useRef<TalentEventCheckoutModalRef>(null);

  const scanLockRef = useRef(false);
  const SCAN_QR_CODE_LOCK_TIME = 1000;

  const handleScanSuccess = (data: ScanEventQRByTalentResDto) => {
    const { event, qr_code, session } = data;

    if (data.action === 'checkin') {
      checkinModalRef.current?.open({
        eventTitle: event.title,
        brandLogoPath: event.brand_logo_path,
        venue: event.venue,
        qrCodeId: qr_code.id,
        onCheckinSuccess: () => {},
      });
    } else if (data.action === 'checkout') {
      checkoutModalRef.current?.open({
        eventTitle: event.title,
        brandLogoPath: event.brand_logo_path,
        venue: event.venue,
        sessionId: session!.id,
        onCheckoutSuccess: () => {},
      });
    }
  };

  const { mutate: scanEventQRByTalent } = useScanEventQRByTalent({
    onError: error => {
      setTimeout(() => {
        scanLockRef.current = false;
      }, SCAN_QR_CODE_LOCK_TIME);
      showMutationErrorToast(error);
    },
    onSuccess: data => {
      handleScanSuccess(data);
      setTimeout(() => {
        scanLockRef.current = false;
      }, SCAN_QR_CODE_LOCK_TIME);
    },
  });

  const onScan = (token: string) => {
    scanEventQRByTalent({ token: token });
  };
  // Camera is active only when the screen is focused and scanning is not paused
  const isActive = isFocused;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (scanLockRef.current) return;
      if (!codes.length) return;

      scanLockRef.current = true;

      const scannedCode = codes[0].value;
      if (scannedCode?.includes('crowdsnow:event-qr-code:'))
        onScan((scannedCode as string).split('crowdsnow:event-qr-code:')[1]);
    },
  });

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const result = await askPermissions();
        setHasPermission(
          result.type === 'granted' || result.type === 'limited',
        );
      } catch {
        setHasPermission(false);
      }
    };

    requestCameraPermission();
  }, [askPermissions]);

  return (
    <ScreenWrapper
      withBottomTabBar
      containerStyle={styles.paddingBottom0}
      contentContainerStyle={styles.paddingBottom0}
      wrapperStyle={styles.paddingBottom0}
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
          <AppButton
            title="Open Settings"
            onPress={() => Linking.openURL('app-settings:')}
          />
        </View>
      </If>

      <TalentEventCheckinModal ref={checkinModalRef} />
      <TalentEventCheckoutModal ref={checkoutModalRef} />
    </ScreenWrapper>
  );
};
