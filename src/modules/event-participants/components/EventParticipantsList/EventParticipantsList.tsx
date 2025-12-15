import { AppFlashList } from '@components';
import { useBoolean } from '@hooks';

import {
  EventParticipantCard,
  IEventParticipant,
} from '../EventParticipantCard';
import { ImagePreviewModal } from '../../modals';

interface EventParticipantsListProps {
  participants: IEventParticipant[];
}

export const EventParticipantsList = ({
  participants,
}: EventParticipantsListProps) => {
  const {
    value: isImageModalVisible,
    setTrue: openImageModal,
    setFalse: closeImageModal,
  } = useBoolean(false);

  const renderItem = ({ item }: { item: IEventParticipant }) => (
    <EventParticipantCard
      participant={item}
      onPressImageIcon={openImageModal}
    />
  );

  return (
    <>
      <AppFlashList
        data={participants}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 16 }}
        gap={0}
        emptyText={'No participants found'}
      />

      <ImagePreviewModal
        isVisible={isImageModalVisible}
        imageUri="https://images.squarespace-cdn.com/content/v1/5c61936f523958463c97eaea/1560950732928-AA1K4DT7G9KMXBMGMDBV/imagea.jpeg"
        onClose={closeImageModal}
      />
    </>
  );
};
