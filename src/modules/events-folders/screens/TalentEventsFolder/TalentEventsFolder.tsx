import {
  AppBottomSheet,
  AppFlashList,
  ScreenWithScrollWrapper,
  Skeleton,
} from '@components';
import { styles } from './styles';
import { COLORS } from '@styles';
import { ICONS } from '@assets';
import { useRef } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { AppButton } from '@ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { goBack, goToScreen, Screens, useScreenNavigation } from '@navigation';
import {
  ActionConfirmationModalRef,
  ActionConfirmationModal,
} from '@modules/common';
import {
  ITalentEventCard,
  useDeleteEventsFolder,
  useGetEventsInEventsFolder,
} from '@actions';
import { showMutationErrorToast } from '@helpers';
import { useRefetchQuery } from '@hooks';
import { DIMENSIONS } from '@constants';
import { TalentEventCard } from '../../../events/talent/components/TalentEventCard';

export const TalentEventsFolder = () => {
  const { params } = useScreenNavigation<Screens.TalentEventsFolder>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const actionConfirmationModalRef = useRef<ActionConfirmationModalRef>(null);

  const {
    data: eventsResponse,
    refetch,
    isLoading,
  } = useGetEventsInEventsFolder({ folder_id: params?.folderId! });

  const events = eventsResponse?.data || [];

  console.log('events', events);

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const { mutateAsync: deleteEventsFolderAsync } = useDeleteEventsFolder({
    onError: showMutationErrorToast,
    onSuccess: () => {
      goBack();
    },
  });

  const renderItem = ({ item }: { item: ITalentEventCard }) => (
    <TalentEventCard
      event={item}
      //   containerStyle={styles.itemContainer}
      //   isLoadingApply={applyEvent.isPending}
      //   isLoadingReject={hideEvent.isPending}
      //   onPressApply={() => handleApply(item)}
      //   onPressReject={handleReject}
      //   onSavePress={handleSave}
    />
  );

  const insets = useSafeAreaInsets();
  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitle"
      title={params?.folderName ?? ''}
      headerStyles={styles.headerStyles}
      rightIcons={[
        {
          icon: () => ICONS.dotsVertical('white'),
          onPress: () => bottomSheetRef.current?.present({}),
        },
      ]}
    >
      <AppFlashList
        refreshing={isRefetchingQuery}
        onRefresh={refetchQuery}
        contentContainerStyle={styles.contentContainer}
        data={isLoading ? undefined : events}
        renderItem={renderItem}
        skeleton={
          isLoading ? (
            <Skeleton>
              <Skeleton.Item style={{ gap: 8 }}>
                <Skeleton.Item
                  width={DIMENSIONS.width - 40}
                  height={207}
                  borderRadius={10}
                />
                <Skeleton.Item width={'100%'} height={207} borderRadius={10} />
                <Skeleton.Item width={'100%'} height={207} borderRadius={10} />
              </Skeleton.Item>
            </Skeleton>
          ) : undefined
        }
      />

      <AppBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={[145 + insets.bottom]}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={styles.buttonsWrapper}>
          <AppButton
            title="Rename Folder"
            titleStyles={{ color: COLORS.black }}
            wrapperStyles={{ borderColor: COLORS.black }}
            size="50"
            variant="withBorder"
            onPress={() => {
              bottomSheetRef.current?.close();
              goToScreen(Screens.RenameEventsFolder, {
                folderId: params?.folderId!,
                folderName: params?.folderName!,
              });
            }}
          />
          <AppButton
            title="Delete Folder"
            titleStyles={{ color: COLORS.red }}
            wrapperStyles={{ borderColor: COLORS.red }}
            size="50"
            variant="withBorder"
            onPress={() => {
              bottomSheetRef.current?.close();
              actionConfirmationModalRef.current?.open({
                title: 'Delete Folder',
                subtitle: 'Are you sure you want to delete this folder?',
                onConfirm: async () => {
                  await deleteEventsFolderAsync({
                    folder_id: params?.folderId!,
                  });
                },
              });
            }}
          />
        </BottomSheetView>
      </AppBottomSheet>

      <ActionConfirmationModal ref={actionConfirmationModalRef} />
    </ScreenWithScrollWrapper>
  );
};
