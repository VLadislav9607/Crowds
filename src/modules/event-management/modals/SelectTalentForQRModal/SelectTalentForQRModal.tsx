import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@styles';
import { useState } from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { AppBottomSheet } from '@components';
import { AppText, Avatar } from '@ui';
import { useBottomSheetData } from '@hooks';
import { useEventParticipantsByStatus, useSendMessage, useSendQRToTalent } from '@actions';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { showMutationErrorToast, showSuccessToast } from '@helpers';
import { IEventParticipant } from '@modules/common';

import { SelectTalentForQRModalData, SelectTalentForQRModalProps } from './types';
import { styles } from './styles';

export const SelectTalentForQRModal = ({
  bottomSheetRef,
}: SelectTalentForQRModalProps) => {
  const { data: modalData, modalRef } =
    useBottomSheetData<SelectTalentForQRModalData>(bottomSheetRef);

  const eventId = modalData?.eventId ?? '';

  const {
    data: participantsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEventParticipantsByStatus(
    {
      eventId,
      status: 'approved',
    },
    { enabled: !!eventId },
  );

  const participants =
    participantsData?.pages.flatMap(page => page.data) ?? [];

  const [sendingTalentId, setSendingTalentId] = useState<string | null>(null);

  const { mutate: sendQR } = useSendQRToTalent({
    onSuccess: () => {
      setSendingTalentId(null);
      showSuccessToast('QR code sent');
      modalRef.current?.close();
    },
    onError: (error) => {
      setSendingTalentId(null);
      showMutationErrorToast(error);
    },
  });

  const { mutate: sendMessage, isPending: isSendingToGroup } = useSendMessage();

  const handleSendToGroup = () => {
    if (!modalData?.groupChatId || sendingTalentId || isSendingToGroup) return;
    setSendingTalentId('group');
    sendMessage(
      {
        chatId: modalData.groupChatId,
        text: `QR Code: ${modalData.qrCodeName}`,
        imagePath: modalData.qrPath,
        imageBucket: 'event_qr',
      },
      {
        onSuccess: () => {
          setSendingTalentId(null);
          showSuccessToast('QR code sent to group');
          modalRef.current?.close();
        },
        onError: (error) => {
          setSendingTalentId(null);
          showMutationErrorToast(error);
        },
      },
    );
  };

  const handleSelectTalent = (talent: IEventParticipant) => {
    if (!modalData || sendingTalentId) return;
    setSendingTalentId(talent.talentId);
    sendQR({
      eventId: modalData.eventId,
      talentId: talent.talentId,
      qrPath: modalData.qrPath,
      qrCodeName: modalData.qrCodeName,
    });
  };

  const renderItem = ({ item }: { item: IEventParticipant }) => {
    const isSending = sendingTalentId === item.talentId;

    return (
      <TouchableOpacity
        style={styles.talentRow}
        onPress={() => handleSelectTalent(item)}
        activeOpacity={0.7}
        disabled={!!sendingTalentId}
      >
        <Avatar
          bucket="talents_avatars"
          size={40}
          imgPath={item.avatar_url || ''}
          name={item.name}
        />
        <View style={styles.talentInfo}>
          <AppText typography="semibold_14" color="black" numberOfLines={1}>
            {item.name}
          </AppText>
          <AppText typography="regular_12" color="gray_primary" numberOfLines={1}>
            {item.location}
          </AppText>
        </View>
        {isSending && (
          <ActivityIndicator size="small" color={COLORS.main} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <AppBottomSheet
      bottomSheetRef={modalRef}
      snapPoints={['50%', '80%']}
      enableDynamicSizing={false}
    >
      <View style={styles.container}>
        <AppText typography="bold_18" color="black" style={styles.title}>
          Send QR to Talent
        </AppText>
      </View>

      <BottomSheetFlatList
        data={participants}
        keyExtractor={(item: IEventParticipant) => item.talentId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          modalData?.groupChatId ? (
            <>
              <TouchableOpacity
                style={styles.talentRow}
                onPress={handleSendToGroup}
                activeOpacity={0.7}
                disabled={!!sendingTalentId}
              >
                <View style={styles.groupIcon}>
                  <SvgXml xml={ICONS.sendMessage('white')} width={20} height={20} />
                </View>
                <View style={styles.talentInfo}>
                  <AppText typography="semibold_14" color="black">
                    Group Chat
                  </AppText>
                  <AppText typography="regular_12" color="gray_primary">
                    Send to all participants
                  </AppText>
                </View>
                {sendingTalentId === 'group' && (
                  <ActivityIndicator size="small" color={COLORS.main} />
                )}
              </TouchableOpacity>
              <View style={styles.separator} />
            </>
          ) : null
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={styles.loader} /> : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText typography="regular_14" color="gray_primary">
              No approved talents
            </AppText>
          </View>
        }
      />

    </AppBottomSheet>
  );
};
