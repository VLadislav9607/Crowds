import { queryClient } from '../reactQuery';
import { TANSTACK_QUERY_KEYS } from '@constants';

/**
 * Refetches relevant query caches based on push notification type.
 * Uses refetchQueries instead of invalidateQueries to force
 * immediate data refresh even on the currently active screen.
 */
export function invalidateCacheForNotificationType(
  type: string | undefined,
): void {
  if (!type) return;

  switch (type) {
    // Talent receives invite, approval, or event edit → refresh talent event lists
    case 'event_invitation':
    case 'event_approved':
    case 'event_cancelled':
    case 'event_edit':
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
      });
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
      });
      break;

    // Talent's application was rejected → refresh talent event lists
    case 'application_rejected':
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
      });
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
      });
      break;

    // Org receives talent approved/cancelled/applied/declined → refresh participants
    case 'talent_approved':
    case 'talent_cancelled':
    case 'talent_applied':
    case 'talent_declined':
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.EVENT_PARTICIPANTS_BY_STATUS],
      });
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PARTICIPANTS_COUNTS],
      });
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
      });
      break;

    // Checkin/checkout → refresh participants
    case 'talent_checkin':
    case 'talent_checkout':
    case 'checkin_success':
    case 'checkout_success':
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.EVENT_PARTICIPANTS_BY_STATUS],
      });
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PARTICIPANTS_COUNTS],
      });
      break;

    // Event fulfilled → refresh org events
    case 'event_fulfilled':
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
      });
      break;

    // Flag applied → refresh flag data
    case 'flag_applied':
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_MY_ACTIVE_FLAG],
      });
      break;

    // Task rejected → refresh task completions so talent sees updated status
    case 'task_rejected':
      queryClient.refetchQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_TASK_COMPLETIONS],
      });
      break;
  }
}
