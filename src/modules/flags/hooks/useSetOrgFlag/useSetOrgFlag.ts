import {
  useCreateOrgYellowFlag,
  useCreateOrgRedFlag,
  useCreateBlackFlagReport,
} from '@actions';
import { showMutationErrorToast, showSuccessToast } from '@helpers';
import { goBack } from '@navigation';

interface UseSetOrgFlagProps {
  resetForm: () => void;
  closeNoteModal: () => void;
}

export const useSetOrgFlag = ({
  resetForm,
  closeNoteModal,
}: UseSetOrgFlagProps) => {
  const onSuccess = () => {
    resetForm();
    closeNoteModal();

    setTimeout(() => {
      showSuccessToast('Flag submitted successfully');
    }, 500);

    goBack();
  };

  const onError = (error: Error) => {
    closeNoteModal();
    setTimeout(() => {
      showMutationErrorToast(error);
    }, 500);
  };

  const createOrgYellowFlag = useCreateOrgYellowFlag({
    onSuccess,
    onError,
  });
  const createOrgRedFlag = useCreateOrgRedFlag({
    onSuccess,
    onError,
  });
  const createBlackFlagReport = useCreateBlackFlagReport({
    onSuccess,
    onError,
  });

  return {
    createOrgYellowFlag,
    createOrgRedFlag,
    createBlackFlagReport,
  };
};
