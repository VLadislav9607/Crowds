import { ScreenWrapper } from '@components';
import { styles } from './styles';
import { ICONS } from '@assets';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Screens, useScreenNavigation } from '@navigation';
import { useGetEventsInEventsFolder } from '@actions';
import { TalentEventsViewList } from '../../../events/talent/components';
import { FolderActionButtonsModal } from '../../modals';
import { EventsFolderActionsModalData } from '../../modals/EventsFolderActionsModal/types';

export const TalentEventsFolder = () => {
  const { params } = useScreenNavigation<Screens.TalentEventsFolder>();
  const bottomSheetRef =
    useRef<BottomSheetModal<EventsFolderActionsModalData>>(null);

  const {
    data: eventsResponse,
    isLoading,
    hasNextPage,
    refetch,
    fetchNextPage,
    error,
  } = useGetEventsInEventsFolder({ folder_id: params?.folderId! });

  console.log('error', error);

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      title={params?.folderName ?? ''}
      headerStyles={styles.headerStyles}
      containerStyle={styles.screenContainerStyle}
      rightIcons={[
        {
          icon: () => ICONS.dotsVertical('white'),
          onPress: () =>
            bottomSheetRef.current?.present({
              folderId: params?.folderId!,
              folderName: params?.folderName!,
            }),
        },
      ]}
    >
      <TalentEventsViewList
        data={eventsResponse?.data}
        isLoading={isLoading}
        contentContainerStyle={styles.listContentContainer}
        hasMoreItems={hasNextPage}
        onLoadMore={fetchNextPage}
        refetch={refetch}
        cardProps={{
          hideRejectButton: true,
          folderId: params?.folderId!,
        }}
      />

      <FolderActionButtonsModal bottomSheetRef={bottomSheetRef} />
    </ScreenWrapper>
  );
};
