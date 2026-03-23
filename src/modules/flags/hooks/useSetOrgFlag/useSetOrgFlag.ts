import { useCreateFlagReport } from '@actions';
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
      showSuccessToast('Report submitted successfully');
    }, 500);

    goBack();
  };

  const onError = (error: Error) => {
    closeNoteModal();
    setTimeout(() => {
      showMutationErrorToast(error);
    }, 500);
  };

  const createFlagReport = useCreateFlagReport({
    onSuccess,
    onError,
  });

  return {
    createFlagReport,
  };
};
