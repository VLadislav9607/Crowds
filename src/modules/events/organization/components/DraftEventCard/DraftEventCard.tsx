import { TouchableOpacity, View } from 'react-native';
import { AppButton } from '@ui';
import { ICONS } from '@assets';
import { IOrgBaseEventCardProps, OrgBaseEventCard, cardStyles } from '../../ui';
import { goToScreen, Screens } from '@navigation';
import { SvgXml } from 'react-native-svg';
import { useDeleteDraft } from '@actions';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

export const DraftEventCard = ({
  event,
  actionConfirmationModalRef,
}: IOrgBaseEventCardProps) => {
  const { mutateAsync: deleteDraftAsync } = useDeleteDraft({
    onSuccess: () => {
      showSuccessToast('Draft deleted successfully');
    },
    onError: error => {
      showMutationErrorToast(error);
    },
  });

  const handlePostToJobBoard = () => {
    goToScreen(Screens.CreateEvent, { draftId: event?.id });
  };

  const onDeleteDraft = () => {
    actionConfirmationModalRef?.current?.open({
      title: 'Delete Draft',
      subtitle: `Are you sure you want to delete this draft - "${event?.title}?"`,
      onConfirm: async () => {
        if (event?.id) {
          await deleteDraftAsync(event.id);
        }
      },
    });
  };

  const footer = (
    <View style={cardStyles.bottomButtons}>
      <AppButton
        title="Preview and post to job board"
        size="28"
        width={265}
        icon={ICONS.chevronRight('main')}
        iconPlace="right"
        onPress={handlePostToJobBoard}
        wrapperStyles={cardStyles.primaryButton}
        titleStyles={cardStyles.primaryButtonText}
      />
    </View>
  );

  const headerRight = (
    <TouchableOpacity
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={onDeleteDraft}
    >
      <SvgXml xml={ICONS.trash('red')} width={18} height={18} />
    </TouchableOpacity>
  );
  return (
    <OrgBaseEventCard event={event} footer={footer} headerRight={headerRight} />
  );
};
