import {
  useCreateBlackFlagReport,
  useCreateTalentRedFlag,
  useCreateTalentYellowFlag,
} from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast, showSuccessToast } from '@helpers';
import { queryClient } from '@services';

interface UseTalentFlagProps {
  resetForm: () => void;
  closeNoteModal: () => void;
}

export const useTalentFlag = ({
  resetForm,
  closeNoteModal,
}: UseTalentFlagProps) => {
  const onSuccess = () => {
    resetForm();
    closeNoteModal();

    setTimeout(() => {
      showSuccessToast('Flag submitted successfully');
    }, 500);

    queryClient.invalidateQueries({
      queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_FLAGS],
    });
  };

  const onError = (error: Error) => {
    closeNoteModal();
    setTimeout(() => {
      showMutationErrorToast(error);
    }, 500);
  };

  const createYellowFlag = useCreateTalentYellowFlag({
    onSuccess,
    onError,
  });
  const createRedFlag = useCreateTalentRedFlag({
    onSuccess,
    onError,
  });
  const createBlackFlagReport = useCreateBlackFlagReport({
    onSuccess,
    onError,
  });

  return {
    createYellowFlag,
    createRedFlag,
    createBlackFlagReport,
  };
};
