import {
  useCreateBlackFlagReport,
  useCreateTalentRedFlag,
  useCreateTalentYellowFlag,
} from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast, showSuccessToast } from '@helpers';
import { queryClient } from '@services';

interface UseSetTalentFlagProps {
  resetForm: () => void;
  closeNoteModal: () => void;
}

export const useSetTalentFlag = ({
  resetForm,
  closeNoteModal,
}: UseSetTalentFlagProps) => {
  const onSuccess = (response: any) => {
    resetForm();
    closeNoteModal();

    setTimeout(() => {
      showSuccessToast('Flag submitted successfully');
    }, 500);

    Promise.allSettled([
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_FLAGS, response.talentId],
      }),
      queryClient.invalidateQueries({
        queryKey: [
          TANSTACK_QUERY_KEYS.GET_TALENT_FULL_PROFILE,
          response.talentId,
        ],
      }),
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.EVENT_PARTICIPANTS_BY_STATUS],
      }),
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_MATCHING_TALENTS],
      }),
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ALL_TALENTS],
      }),
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CUSTOM_LIST_TALENTS],
      }),
    ]);
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
