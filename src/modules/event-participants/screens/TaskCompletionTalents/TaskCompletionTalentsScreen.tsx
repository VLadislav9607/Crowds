import { useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import {
  AppFlashList,
  AppImage,
  AppModal,
  If,
  NoAccess,
  ScreenWrapper,
} from '@components';
import {
  useGetEventTaskCompletions,
  useGetMe,
  useReviewTaskCompletion,
  useGetEventPayment,
  useProcessEventSettlement,
  TaskCompletionTalentDto,
  ProcessEventSettlementBodyDto,
} from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { Screens, useScreenNavigation } from '@navigation';
import { TaskCompletionCard } from '../../components';
import {
  RejectTaskModal,
  SettlementConfirmModal,
  SettlementIssuesModal,
  FailedPayoutItem,
} from '../../modals';
import { showSuccessToast, showErrorToast } from '@helpers';
import { AppButton, AppText } from '@ui';
import { styles } from './styles';

export const TaskCompletionTalentsScreen = () => {
  const { organizationMember } = useGetMe();
  const hasAccess =
    !!organizationMember?.current_context?.capabilitiesAccess.manage_checkins;

  const { params } = useScreenNavigation<Screens.TaskCompletionTalents>();
  const eventId = params?.eventId ?? '';
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetEventTaskCompletions(eventId);
  const { data: eventPayment } = useGetEventPayment(eventId);
  const { mutate: processSettlement, isPending: isSettling } =
    useProcessEventSettlement({
      onSuccess: (data, _variables) => {
        const variables = _variables as ProcessEventSettlementBodyDto;
        setShowSettlementModal(false);
        if (data.failedPayouts?.length > 0) {
          const items: FailedPayoutItem[] = data.failedPayouts.map(fp => {
            const talent = talents.find(t => t.talentId === fp.talentId);
            return {
              name: talent?.name ?? 'Unknown talent',
              reason: fp.reason,
            };
          });
          const approvedCount = (variables?.talentDecisions ?? []).filter(
            d => d.approved,
          ).length;
          setTimeout(() => {
            setSettlementIssues(items);
            setSettlementSuccessCount(Math.max(0, approvedCount - data.failedPayouts.length));
          }, 400);
        } else {
          showSuccessToast('Settlement completed successfully');
        }
      },
      onError: (error: any) => {
        setShowSettlementModal(false);
        showErrorToast(
          error?.message?.includes('aml_blocked')
            ? 'Compliance review in progress. Payments will be available once the review is complete.'
            : error?.message || 'Settlement failed',
        );
      },
    });
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
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [settlementIssues, setSettlementIssues] = useState<FailedPayoutItem[]>([]);
  const [settlementSuccessCount, setSettlementSuccessCount] = useState(0);

  const talents = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data],
  );

  const isSettled =
    talents.length > 0 && talents[0].settlement_status === 'completed';

  const selectableIds = talents
    .filter(
      t =>
        t.task_status !== 'rejected' &&
        !(isSettled && t.payout_status !== 'failed'),
    )
    .map(t => t.taskCompletionId);
  const allSelected =
    selectableIds.length > 0 && selectableIds.every(id => selectedIds.has(id));

  const selectedCount = selectedIds.size;
  const totalApproved = selectableIds.length;

  const settlementPreview = useMemo(() => {
    if (!eventPayment || selectedCount === 0) {
      return {
        totalChargeCents: 0,
        stripeFeeCents: 0,
        talentPayoutCents: 0,
        selectedCount: 0,
        refundCents: 0,
        crowdsEarnings: 0,
      };
    }

    const paymentAmountPerUnit = eventPayment.payment_amount_per_unit ?? 0;
    const durationHours = eventPayment.event_duration_hours ?? 1;
    const perTalentPayout =
      eventPayment.payment_mode === 'per_hour'
        ? Math.round(paymentAmountPerUnit * durationHours)
        : paymentAmountPerUnit;

    const talentPayoutCents = perTalentPayout * selectedCount;
    const unusedBudget = eventPayment.talent_budget_cents - talentPayoutCents;
    const netCommission =
      eventPayment.commission_cents - eventPayment.stripe_fee_cents;
    const totalHeadcount = eventPayment.total_headcount ?? totalApproved;
    const perTalentCommission =
      totalHeadcount > 0 ? netCommission / totalHeadcount : 0;
    const crowdsEarnings = Math.round(perTalentCommission * selectedCount);
    const commissionRefund = Math.round(netCommission - crowdsEarnings);
    const refundCents = unusedBudget + commissionRefund;

    return {
      totalChargeCents: eventPayment.total_charge_cents,
      stripeFeeCents: eventPayment.stripe_fee_cents,
      talentPayoutCents,
      selectedCount,
      refundCents,
      crowdsEarnings,
    };
  }, [eventPayment, selectedCount, totalApproved]);

  const handleSettlementConfirm = () => {
    const talentDecisions = talents.map(t => ({
      talentId: t.talentId,
      approved: selectedIds.has(t.taskCompletionId),
    }));
    processSettlement({ eventId, talentDecisions });
  };

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
      queryClient.setQueryData(
        [TANSTACK_QUERY_KEYS.GET_EVENT_TASK_COMPLETIONS, eventId],
        (prev: typeof data) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map(page => ({
              ...page,
              data: page.data.map(t =>
                t.taskCompletionId === rejectId
                  ? { ...t, task_status: 'rejected' }
                  : t,
              ),
            })),
          };
        },
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

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: TaskCompletionTalentDto }) => (
      <TaskCompletionCard
        item={item}
        isSelected={selectedIds.has(item.taskCompletionId)}
        isSettled={isSettled}
        onToggleSelect={() => toggleSelection(item.taskCompletionId)}
        onViewPhoto={handleViewPhoto}
        onReject={handleReject}
      />
    ),
    [selectedIds, isSettled, toggleSelection, handleViewPhoto, handleReject],
  );

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Task Completions"
      showLoader={isLoading && hasAccess}
      contentContainerStyle={styles.contentContainer}
    >
      <If condition={hasAccess}>
        {selectableIds.length > 0 && (
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
          contentContainerStyle={
            isSettled || talents.length === 0
              ? styles.listContentNoHeader
              : styles.listContent
          }
          gap={8}
          emptyText="No task completions found"
          refreshing={isRefetching}
          onRefresh={refetch}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          showBottomLoader={isFetchingNextPage}
        />

        {selectedIds.size > 0 && (
          <View
            style={[styles.bottomBar, { paddingBottom: insets.bottom || 24 }]}
          >
            <AppButton
              title={`Proceed to Pay (${selectedIds.size})`}
              variant="primary"
              onPress={() => setShowSettlementModal(true)}
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

        <SettlementConfirmModal
          isVisible={showSettlementModal}
          onClose={() => setShowSettlementModal(false)}
          onConfirm={handleSettlementConfirm}
          isLoading={isSettling}
          preview={settlementPreview}
        />

      </If>
      <If condition={!hasAccess}>
        <NoAccess />
      </If>

      <SettlementIssuesModal
        isVisible={settlementIssues.length > 0}
        onClose={() => setSettlementIssues([])}
        failedPayouts={settlementIssues}
        successCount={settlementSuccessCount}
      />
    </ScreenWrapper>
  );
};
