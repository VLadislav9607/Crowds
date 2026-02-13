import { useState, useCallback } from 'react';
import {
  useAcceptTalentApplication,
  useGetActiveFlagForTarget,
} from '@actions';
import type { ActiveFlagRow } from '@actions';

const TARGET_TYPE_TALENT = 'talent';

type YellowFlagModalState = {
  visible: true;
  flag: ActiveFlagRow;
  pendingAccept: { participationId: string; talentId: string };
} | null;

export const useAcceptApplication = (
  setSelectedTalentId: (id: string | null) => void,
) => {
  const [yellowFlagModal, setYellowFlagModal] =
    useState<YellowFlagModalState>(null);

  const { mutateAsync: getActiveFlagForTarget } = useGetActiveFlagForTarget();

  const acceptMutation = useAcceptTalentApplication({
    onSettled: () => setSelectedTalentId(null),
  });

  const handleAccept = useCallback(
    async (participationId: string, talentId: string) => {
      try {
        const flag = await getActiveFlagForTarget({
          targetType: TARGET_TYPE_TALENT,
          targetId: talentId,
        });
        if (flag?.status === 'yellow') {
          setYellowFlagModal({
            visible: true,
            flag,
            pendingAccept: { participationId, talentId },
          });
          return;
        }
        setSelectedTalentId(talentId);
        acceptMutation.mutate({ participationId });
      } catch {
        setSelectedTalentId(talentId);
        acceptMutation.mutate({ participationId });
      }
    },
    [getActiveFlagForTarget, acceptMutation, setSelectedTalentId],
  );

  const closeYellowFlagModal = useCallback(() => {
    setYellowFlagModal(null);
  }, []);

  const confirmYellowFlagModal = useCallback(() => {
    if (yellowFlagModal?.visible && yellowFlagModal.pendingAccept) {
      const { participationId, talentId } = yellowFlagModal.pendingAccept;
      setSelectedTalentId(talentId);
      acceptMutation.mutate({ participationId });
      setYellowFlagModal(null);
    }
  }, [yellowFlagModal, acceptMutation, setSelectedTalentId]);

  return {
    handleAccept,
    yellowFlagModal,
    closeYellowFlagModal,
    confirmYellowFlagModal,
    isPending: acceptMutation.isPending,
  };
};
