import { Keyboard } from 'react-native';
import { useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { TalentFlag } from '@modules/common';
import { YellowReason } from '@actions';

import { FlagParticipantFormValues } from '../types';
import { useSetTalentFlag } from '../useSetTalentFlag';

type UseFlagParticipantFormParams = {
  talentId: string;
  eventId: string;
};

export const useFlagParticipantForm = ({
  talentId,
  eventId,
}: UseFlagParticipantFormParams) => {
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [pendingData, setPendingData] =
    useState<FlagParticipantFormValues | null>(null);

  const { createYellowFlag, createRedFlag, createBlackFlagReport } =
    useSetTalentFlag({ resetForm, closeNoteModal });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<FlagParticipantFormValues>({
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

  const openNoteModal = useCallback((data: FlagParticipantFormValues) => {
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
    async (data: FlagParticipantFormValues) => {
      const trimmedReason = data.reason.trim();

      if (data.selectedFlag === TalentFlag.YELLOW) {
        await createYellowFlag.mutateAsync({
          talentId,
          eventId,
          reason: YellowReason.BAD_BEHAVIOR,
          description: trimmedReason || undefined,
        });
      } else if (data.selectedFlag === TalentFlag.RED) {
        await createRedFlag.mutateAsync({
          talentId,
          eventId,
          description: trimmedReason,
        });
      } else if (data.selectedFlag === TalentFlag.BLACK) {
        await createBlackFlagReport.mutateAsync({
          targetType: 'talent',
          targetId: talentId,
          eventId,
          description: trimmedReason,
        });
      }
    },
    [createYellowFlag, createRedFlag, createBlackFlagReport, eventId, talentId],
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
      createYellowFlag.isPending ||
      createRedFlag.isPending ||
      createBlackFlagReport.isPending,
    isNoteModalVisible,
    openNoteModal,
    closeNoteModal,
    confirmNoteModal,
  };
};
