import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { AppFlashList, AppImage, AppModal, ScreenWrapper } from '@components';
import {
  useGetEventTaskCompletions,
  useReviewTaskCompletion,
  TaskCompletionTalentDto,
} from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { Screens, useScreenNavigation } from '@navigation';
import { TaskCompletionCard } from '../../components';
import { RejectTaskModal } from '../../modals';
import { showSuccessToast, showErrorToast } from '@helpers';
import { AppButton, AppText } from '@ui';
import { styles } from './styles';

export const TaskCompletionTalentsScreen = () => {
  const { params } = useScreenNavigation<Screens.TaskCompletionTalents>();
  const eventId = params?.eventId ?? '';
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

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
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const talents = data ?? [];
  const selectableIds = talents
    .filter(t => t.task_status !== 'rejected')
    .map(t => t.taskCompletionId);
  const allSelected =
    selectableIds.length > 0 && selectableIds.every(id => selectedIds.has(id));

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(selectableIds));
    }
  };

  const handleRejectConfirm = () => {
    if (rejectId) {
      queryClient.setQueryData<TaskCompletionTalentDto[]>(
        [TANSTACK_QUERY_KEYS.GET_EVENT_TASK_COMPLETIONS, eventId],
        prev =>
          prev?.map(t =>
            t.taskCompletionId === rejectId
              ? { ...t, task_status: 'rejected' }
              : t,
          ),
      );
      selectedIds.delete(rejectId);
      setSelectedIds(new Set(selectedIds));
      reviewTask({
        task_completion_id: rejectId,
        status: 'rejected',
      });
    }
    setRejectId(null);
  };

  const handleViewPhoto = useCallback((path: string) => {
    setPreviewPhoto(path);
  }, []);

  const handleReject = useCallback((id: string) => {
    setRejectId(id);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: TaskCompletionTalentDto }) => (
      <TaskCompletionCard
        item={item}
        isSelected={selectedIds.has(item.taskCompletionId)}
        onToggleSelect={() => toggleSelection(item.taskCompletionId)}
        onViewPhoto={handleViewPhoto}
        onReject={handleReject}
      />
    ),
    [selectedIds, toggleSelection, handleViewPhoto, handleReject],
  );

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Task Completions"
      showLoader={isLoading}
      contentContainerStyle={styles.contentContainer}
    >
      {talents.length > 0 && (
        <Pressable onPress={toggleSelectAll} style={styles.selectAllRow}>
          <AppText typography="bold_14" color="main">
            {allSelected ? 'Deselect All' : 'Select All'}
          </AppText>
        </Pressable>
      )}

      <AppFlashList
        data={talents}
        keyExtractor={item => item.taskCompletionId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        gap={8}
        emptyText="No task completions found"
      />

      {selectedIds.size > 0 && (
        <View
          style={[styles.bottomBar, { paddingBottom: insets.bottom || 24 }]}
        >
          <AppButton
            title={`Proceed to Pay (${selectedIds.size})`}
            variant="primary"
            onPress={() => {}}
          />
        </View>
      )}

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

      <RejectTaskModal
        isVisible={!!rejectId}
        onClose={() => setRejectId(null)}
        onConfirm={handleRejectConfirm}
      />
    </ScreenWrapper>
  );
};
