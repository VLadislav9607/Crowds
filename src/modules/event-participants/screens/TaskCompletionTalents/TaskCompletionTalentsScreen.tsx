import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AppFlashList,
  AppImage,
  AppModal,
  IPopupMenuItem,
  ScreenWrapper,
} from '@components';
import { useGetEventTaskCompletions, useReviewTaskCompletion } from '@actions';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { TalentFlag } from '@modules/common';
import { showSuccessToast, showErrorToast } from '@helpers';

import { EventParticipantCard, IEventParticipant } from '../../components';

const TASK_COMPLETION_MENU_ITEMS: IPopupMenuItem[] = [
  // { label: 'Approve task', value: 'approve_task' },
  // { label: 'Reject task', value: 'reject_task' },
  { label: 'Add flag', value: 'add_flag' },
];

export const TaskCompletionTalentsScreen = () => {
  const { params } = useScreenNavigation<Screens.TaskCompletionTalents>();
  const eventId = params?.eventId ?? '';

  const { data, isLoading } = useGetEventTaskCompletions(eventId);
  const { mutate: reviewTask } = useReviewTaskCompletion({
    onSuccess: () => {
      showSuccessToast('Task reviewed successfully');
    },
    onError: () => {
      showErrorToast('Failed to review task');
    },
  });

  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const participants: IEventParticipant[] = (data ?? []).map(item => ({
    id: item.participationId,
    name: item.name,
    location: item.location,
    status: 'completed_tasks' as const,
    time: '',
    flag: (item.flag as TalentFlag) ?? TalentFlag.GREEN,
    avatarPath: item.avatar_url,
    avatarBucket: 'talents_avatars' as const,
  }));

  const handleMenuSelect =
    (talentId: string, taskCompletionId: string) => (item: IPopupMenuItem) => {
      if (item.value === 'approve_task') {
        reviewTask({
          task_completion_id: taskCompletionId,
          status: 'approved',
        });
      } else if (item.value === 'reject_task') {
        reviewTask({
          task_completion_id: taskCompletionId,
          status: 'rejected',
        });
      } else if (item.value === 'add_flag') {
        goToScreen(Screens.FlagParticipant, { talentId, eventId });
      }
    };

  const renderItem = ({ item }: { item: IEventParticipant }) => {
    const talentDto = data?.find(d => d.participationId === item.id);

    return (
      <EventParticipantCard
        participant={item}
        menuItems={TASK_COMPLETION_MENU_ITEMS}
        // onMenuSelect={
        //   talentDto
        //     ? handleMenuSelect(talentDto.talentId, talentDto.taskCompletionId)
        //     : undefined
        // }
        onPressImageIcon={
          talentDto?.task_photo_path
            ? () => setPreviewPhoto(talentDto.task_photo_path)
            : undefined
        }
      />
    );
  };

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Task Completions"
      showLoader={isLoading}
      contentContainerStyle={styles.contentContainer}
    >
      <AppFlashList
        data={participants}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 16 }}
        gap={0}
        emptyText="No task completions found"
      />

      <AppModal
        isVisible={!!previewPhoto}
        onClose={() => setPreviewPhoto(null)}
        title="Task Photo"
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.photoContainer}>
          <AppImage
            imgPath={previewPhoto ?? undefined}
            bucket="task_completion_photos"
            containerStyle={styles.fullPhoto}
          />
        </View>
      </AppModal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  modalContent: {
    paddingHorizontal: 16,
  },
  photoContainer: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
  },
  fullPhoto: {
    width: '100%',
    height: '100%',
  },
});
