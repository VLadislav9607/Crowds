import { AppBottomSheet, If, Skeleton } from '@components';
import { AddEventToForderModalData, AddEventToForderModalProps } from './types';
import {
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useBottomSheetData } from '@hooks';
import { AppCheckbox, AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { goToScreen, Screens } from '@navigation';
import {
  EventFolder,
  useGetEventsFolders,
  useToggleEventInEventsFolder,
} from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { showMutationErrorToast } from '@helpers';
import { COLORS } from '@styles';
import { useEffect, useState } from 'react';

const MAX_CONTENT_HEIGHT = Dimensions.get('window').height * 0.9;

const AddEventToFolderItem = ({
  folder,
  eventId,
  isAdded,
}: {
  folder: EventFolder;
  eventId: string;
  isAdded: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(isAdded);

  const { mutateAsync: toggleEventInEventsFolder, isPending } =
    useToggleEventInEventsFolder({
      onSuccess: async () => {
        setIsChecked(!isChecked);
        await queryClient.refetchQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_FOLDERS],
        });
        queryClient.refetchQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER,
            folder.id,
          ],
        });
      },
      onError: showMutationErrorToast,
    });

  const handleToggleEventInEventsFolder = (folderId: string) => {
    if (!eventId) return;
    toggleEventInEventsFolder({
      event_id: eventId,
      folder_id: folderId,
    });
  };

  return (
    <TouchableOpacity
      disabled={isPending}
      key={folder.id}
      onPress={() => handleToggleEventInEventsFolder(folder.id)}
      activeOpacity={0.7}
      style={styles.folderItem}
    >
      <View style={styles.folderItemLeft}>
        <View style={styles.folderIconContainer}>
          <SvgXml xml={ICONS.heart('white')} width={20} height={20} />
        </View>

        <AppText typography="regular_16" color="black">
          {folder.name}
        </AppText>
      </View>

      <If condition={isPending}>
        <ActivityIndicator color={COLORS.main} size={20} />
      </If>
      <If condition={!isPending}>
        <AppCheckbox
          disabled
          type="plusIcon"
          colorChecked={'main'}
          checked={!!isChecked}
        />
      </If>
    </TouchableOpacity>
  );
};

export const AddEventToForderModal = ({
  bottomSheetRef,
}: AddEventToForderModalProps) => {
  const { data, modalRef } =
    useBottomSheetData<AddEventToForderModalData>(bottomSheetRef);
  const insets = useSafeAreaInsets();
  const eventId = data?.eventId;

  const { data: folders, isLoading: isLoadingFolders } = useGetEventsFolders({
    event_id: eventId,
  });

  useEffect(() => {
    if (data?.onChangeIsInAnyFolder && eventId) {
      data.onChangeIsInAnyFolder(
        folders?.some(folder => folder.has_event) ?? false,
      );
    }
  }, [folders, eventId, data]);

  return (
    <AppBottomSheet<AddEventToForderModalData>
      bottomSheetRef={modalRef}
      enableDynamicSizing={true}
      maxDynamicContentSize={MAX_CONTENT_HEIGHT}
      enableContentPanningGesture={false}
    >
      <BottomSheetView
        style={[styles.bottomSheetView, { paddingBottom: insets.bottom + 10 }]}
      >
        <View style={styles.headerContainer}>
          <AppText typography="h3" color="black_50">
            Save Job
          </AppText>

          {/* <TouchableOpacity activeOpacity={0.8} hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
                    <AppText typography='semibold_16' color='main'>View Folder</AppText>
                </TouchableOpacity> */}
        </View>

        <TouchableOpacity
          onPress={() => {
            modalRef.current?.close();
            goToScreen(Screens.CreateEventsFolder);
          }}
          activeOpacity={0.7}
          style={styles.createFolderButton}
        >
          <View style={styles.iconContainer}>
            <SvgXml xml={ICONS.plus('white')} width={20} height={20} />
          </View>

          <AppText typography="semibold_16" color="black">
            Create New Folder
          </AppText>
        </TouchableOpacity>

        <If condition={!!folders?.length}>
          <View style={styles.foldersList}>
            {folders?.map(folder => (
              <AddEventToFolderItem
                key={folder.id}
                folder={folder}
                eventId={eventId!}
                isAdded={!!folder.has_event}
              />
            ))}
          </View>
        </If>

        <If condition={isLoadingFolders}>
          <Skeleton>
            <Skeleton.Item style={{ gap: 16 }}>
              <Skeleton.Item width={'100%'} height={40} borderRadius={10} />
              <Skeleton.Item width={'100%'} height={40} borderRadius={10} />
              <Skeleton.Item width={'100%'} height={40} borderRadius={10} />
            </Skeleton.Item>
          </Skeleton>
        </If>
      </BottomSheetView>
    </AppBottomSheet>
  );
};
