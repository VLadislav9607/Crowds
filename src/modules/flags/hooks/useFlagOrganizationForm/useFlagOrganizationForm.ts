import { Keyboard } from 'react-native';
import { useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { TalentFlag } from '@modules/common';

import { FlagOrganizationFormValues } from '../types';
import { useSetOrgFlag } from '../useSetOrgFlag';

type UseFlagOrganizationFormParams = {
  eventId: string;
  brandId: string;
};

export const useFlagOrganizationForm = ({
  eventId,
  brandId,
}: UseFlagOrganizationFormParams) => {
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [pendingData, setPendingData] =
    useState<FlagOrganizationFormValues | null>(null);

  const { createOrgYellowFlag, createOrgRedFlag, createBlackFlagReport } =
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

      if (data.selectedFlag === TalentFlag.YELLOW) {
        await createOrgYellowFlag.mutateAsync({
          eventId,
          description: trimmedReason,
        });
      } else if (data.selectedFlag === TalentFlag.RED) {
        await createOrgRedFlag.mutateAsync({
          eventId,
          description: trimmedReason,
        });
      } else if (data.selectedFlag === TalentFlag.BLACK) {
        await createBlackFlagReport.mutateAsync({
          targetType: 'organization',
          targetId: brandId,
          eventId,
          description: trimmedReason,
        });
      }
    },
    [createOrgYellowFlag, createOrgRedFlag, createBlackFlagReport, eventId, brandId],
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
    isLoading:
      createOrgYellowFlag.isPending ||
      createOrgRedFlag.isPending ||
      createBlackFlagReport.isPending,
    isNoteModalVisible,
    openNoteModal,
    closeNoteModal,
    confirmNoteModal,
  };
};
