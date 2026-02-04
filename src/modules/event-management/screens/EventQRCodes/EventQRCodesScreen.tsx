import { AppImage, If, ScreenWrapper, Skeleton } from '@components';
import { FlashList } from '@shopify/flash-list';
import { AppButton, AppText } from '@ui';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { ICONS } from '@assets';
import {
  EventQRCodeEditorModal,
  EventQRCodeEditorModalRef,
  QRCodeActionsModal,
} from '../../modals';
import { useRef } from 'react';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { QRCodeActionsModalData } from '../../modals/QRCodeActionsModal/types';
import { Screens, useScreenNavigation } from '@navigation';
import { IEventQRCode, useGetEventQRCodes } from '@actions';
import { useBoolean, useRefetchQuery } from '@hooks';
import { formatInTimeZone } from 'date-fns-tz';
import { COLORS } from '@styles';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { supabase } from '@services';

export const EventQRCodesScreen = () => {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom || 16;
  const { params } = useScreenNavigation<Screens.EventQRCodes>();
  const timezone = params?.timezone || 'UTC';

  const eventQRCodeEditorModalRef = useRef<EventQRCodeEditorModalRef>(null);
  const qrCodeActionsModalRef =
    useRef<BottomSheetModal<QRCodeActionsModalData>>(null);

  const {
    data: eventQRCodesResponse,
    isLoading: isLoadingEventQRCodes,
    hasNextPage,
    refetch,
  } = useGetEventQRCodes({
    event_id: params?.eventId!,
  });

  const eventQRCodes = eventQRCodesResponse?.data || [];

  const isEmpty = !isLoadingEventQRCodes && !eventQRCodes.length;

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const { value: isSharingQRCode, setValue: setIsSharingQRCode } =
    useBoolean(false);

  const onShareQRCode = async (qrCode: IEventQRCode) => {
    setIsSharingQRCode(true);
    try {
      // 1) Отримуємо SIGNED https URL (бо bucket private, а qr_path це просто path)
      const { data, error } = await supabase.storage
        .from('event_qr')
        .createSignedUrl(qrCode.qr_path, 60);

      if (error || !data?.signedUrl) {
        throw new Error(error?.message || 'Failed to create signed url');
      }

      // 2) Качаємо у tmp/cache (НЕ в .app bundle)
      const fileName = `${qrCode.id}.png`;
      const localPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

      const dl = RNFS.downloadFile({
        fromUrl: data.signedUrl, // <-- ВАЖЛИВО: має бути https
        toFile: localPath,
      });

      const res = await dl.promise;
      if (res.statusCode && res.statusCode >= 400) {
        throw new Error(`Download failed: ${res.statusCode}`);
      }

      // 3) Шеримо локальний файл (file://)
      const fileUrl = `file://${localPath}`;

      await Share.open({
        url: fileUrl,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (e) {
      console.error('Share QR error:', e);
    } finally {
      setIsSharingQRCode(false);
    }
  };

  const renderItem = ({ item }: { item: IEventQRCode }) => {
    const formattedStartAt = item.start_at
      ? formatInTimeZone(item.start_at, timezone, 'MMM d, yyyy h:mm a')
      : '';
    const formattedEndAt = item.end_at
      ? formatInTimeZone(item.end_at, timezone, 'MMM d, yyyy h:mm a')
      : '';
    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          {/* <View style={styles.qrCodeImage} /> */}
          <AppImage
            bucket="event_qr"
            imgPath={item.qr_path}
            containerStyle={styles.qrCodeImage}
          />
          <View style={styles.itemInfo}>
            <View style={styles.itemTitleBlock}>
              <AppText
                typography="semibold_16"
                color="black"
                style={styles.itemTitle}
              >
                {item.name}
              </AppText>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() =>
                  qrCodeActionsModalRef.current?.present({
                    qrCodeName: item.name,
                    qrCodeId: item.id,
                    eventId: params?.eventId!,
                  })
                }
              >
                <SvgXml
                  width={20}
                  height={20}
                  xml={ICONS.dotsVertical('black')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.itemRow}>
              <SvgXml
                width={20}
                height={20}
                xml={ICONS.arrowRightInCircle('green')}
              />

              <View>
                <AppText typography="medium_12" color="gray_primary">
                  Check-in
                </AppText>
                <AppText typography="regular_14" color="black">
                  {formattedStartAt}
                </AppText>
              </View>
            </View>

            <View style={styles.itemRow}>
              <SvgXml
                width={20}
                height={20}
                xml={ICONS.arrowLeftInCircle('red')}
              />

              <View>
                <AppText typography="medium_12" color="gray_primary">
                  Check-out
                </AppText>
                <AppText typography="regular_14" color="black">
                  {formattedEndAt}
                </AppText>
              </View>
            </View>
          </View>
        </View>

        <AppButton
          title="Share"
          variant="withBorder"
          size="40"
          wrapperStyles={styles.shareButton}
          icon={ICONS.upload('black')}
          onPress={() => onShareQRCode(item)}
        />
      </View>
    );
  };

  const onGenerateQRCode = () => {
    eventQRCodeEditorModalRef.current?.open({
      eventId: params?.eventId!,
    });
  };

  const EmptyComponent = isLoadingEventQRCodes ? (
    <Skeleton>
      <Skeleton.Item style={{ gap: 8 }}>
        <Skeleton.Item width={'100%'} height={192} borderRadius={10} />
        <Skeleton.Item width={'100%'} height={192} borderRadius={10} />
        <Skeleton.Item width={'100%'} height={192} borderRadius={10} />
      </Skeleton.Item>
    </Skeleton>
  ) : (
    <View style={styles.emptyContainer}>
      <AppText typography="semibold_16" color="black">
        No QR codes Yet
      </AppText>

      <AppText
        typography="regular_14"
        color="black"
        style={styles.emptySubtitle}
      >
        Generate your first QR code to enable{'\n'}
        check-ins at your event.
      </AppText>

      <AppButton
        onPress={onGenerateQRCode}
        title="Generate QR Code"
        icon={ICONS.plus()}
        iconSize={24}
        size="56"
        wrapperStyles={styles.emptyButton}
      />
    </View>
  );

  const ListFooterComponent =
    isEmpty || isLoadingEventQRCodes ? null : (
      <>
        <AppButton
          onPress={onGenerateQRCode}
          title="Generate QR Code"
          variant="withBorder"
          icon={ICONS.plus('main')}
          iconSize={24}
          titleStyles={styles.generateQRCodeButtonTitle}
          size="56"
          wrapperStyles={styles.generateQRCodeButton}
        />

        <If condition={hasNextPage}>
          <ActivityIndicator style={{ marginTop: 16 }} color={COLORS.black} />
        </If>
      </>
    );

  return (
    <ScreenWrapper
      showLoader={isSharingQRCode}
      withBottomTabBar
      containerStyle={styles.containerStyle}
      headerVariant="withTitleAndImageBg"
      title="QR Codes"
    >
      <FlashList
        refreshing={isRefetchingQuery}
        onRefresh={refetchQuery}
        renderItem={renderItem}
        data={eventQRCodes}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyComponent}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingBottom: bottomPadding },
        ]}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={ListFooterComponent}
      />

      <EventQRCodeEditorModal ref={eventQRCodeEditorModalRef} />
      <QRCodeActionsModal bottomSheetRef={qrCodeActionsModalRef} />
    </ScreenWrapper>
  );
};
