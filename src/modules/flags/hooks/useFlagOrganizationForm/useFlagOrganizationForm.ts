import { Keyboard } from 'react-native';
import { useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { TalentFlag } from '@modules/common';

import { FlagOrganizationFormValues } from '../types';
import { useSetOrgFlag } from '../useSetOrgFlag';

type UseFlagOrganizationFormParams = {
  eventId: string;
};

export const useFlagOrganizationForm = ({
  eventId,
}: UseFlagOrganizationFormParams) => {
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [pendingData, setPendingData] =
    useState<FlagOrganizationFormValues | null>(null);

  const { createFlagReport } =
    useSetOrgFlag({ resetForm, closeNoteModal });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<FlagOrganizationFormValues>({
    defaultValues: {
      selectedFlag: TalentFlag.YELLOW,
      reason: '',
    },
    mode: 'onChange',
  });

  const selectedFlag = useWatch({ control, name: 'selectedFlag' });

  const setSelectedFlag = useCallback(
    (flag: TalentFlag) => setValue('selectedFlag', flag),
    [setValue],
  );

  const openNoteModal = useCallback((data: FlagOrganizationFormValues) => {
    Keyboard.dismiss();
    setPendingData(data);
    setIsNoteModalVisible(true);
  }, []);

  function closeNoteModal() {
    setIsNoteModalVisible(false);
    setPendingData(null);
  }

  function resetForm() {
    reset();
  }

  const submitFlag = useCallback(
    async (data: FlagOrganizationFormValues) => {
      const trimmedReason = data.reason.trim();

      await createFlagReport.mutateAsync({
        targetType: 'organization',
        eventId,
        description: trimmedReason,
      });
    },
    [createFlagReport, eventId],
  );

  const confirmNoteModal = useCallback(async () => {
    if (!pendingData) return;
    await submitFlag(pendingData);
    setIsNoteModalVisible(false);
    setPendingData(null);
  }, [pendingData, submitFlag]);

  return {
    control,
    handleSubmit,
    selectedFlag,
    setSelectedFlag,
    isValid,
    isLoading: createFlagReport.isPending,
    isNoteModalVisible,
    openNoteModal,
    closeNoteModal,
    confirmNoteModal,
  };
};
