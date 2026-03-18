import { useState, useEffect, useCallback, useRef } from 'react';
import { BackHandler } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useGetMe, useUpdateTalent } from '@actions';
import { goToScreen, goBack, Screens, RootStackParamList } from '@navigation';
import {
  useIsUserVerified,
  invalidateUserKycStatus,
  USER_KYC_STATUS_QUERY_KEY,
} from '../../hooks/useIsUserVerified';
import { useKycStatusSubscription } from '../../hooks/useKycStatusSubscription';
import { queryClient } from '@services';

type VerificationProcessingRoute = RouteProp<
  RootStackParamList,
  Screens.VerificationProcessing
>;

type VerificationState = 'pending' | 'completed' | 'failed';

const TOTAL_CHECKS = 3;

export const useVerificationProcessing = () => {
  const route = useRoute<VerificationProcessingRoute>();
  const { origin } = route.params;

  const { me, isTalent, talent } = useGetMe();
  const { mutateAsync: updateTalent } = useUpdateTalent();
  const userId = me?.id || '';

  // Invalidate cache on mount so we always get fresh data (handles re-entry)
  useEffect(() => {
    if (userId) {
      queryClient.invalidateQueries({
        queryKey: [USER_KYC_STATUS_QUERY_KEY, userId],
      });
    }
  }, [userId]);

  const {
    kycStatus,
    checksPassed,
    isLoading: isLoadingInitial,
    isFetching,
  } = useIsUserVerified({ userId });

  const [state, setState] = useState<VerificationState>('pending');
  const [currentChecksPassed, setCurrentChecksPassed] = useState(0);
  const hasNavigatedRef = useRef(false);

  // Handle initial state on mount / re-entry (wait for fresh fetch)
  useEffect(() => {
    if (isLoadingInitial || isFetching) return;

    if (kycStatus === 'completed') {
      setCurrentChecksPassed(TOTAL_CHECKS);
      setState('completed');
    } else if (kycStatus === 'failed') {
      setCurrentChecksPassed(checksPassed);
      setState('failed');
    } else {
      setCurrentChecksPassed(checksPassed);
    }
  }, [isLoadingInitial, isFetching, kycStatus, checksPassed]);

  const handleVerificationSuccess = useCallback(async () => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;

    if (userId) {
      await invalidateUserKycStatus(userId);
    }

    if (isTalent) {
      if ((talent?.onboarding_copleted_step ?? 0) < 2) {
        await updateTalent({
          id: userId,
          data: { onboarding_copleted_step: 2 },
        });
      }
    }

    if (origin === 'talent_onboarding') {
      goToScreen(Screens.OnboardingAuthTalent);
    } else if (origin === 'org_onboarding') {
      goToScreen(Screens.OrgIdentityVerification);
    } else {
      goBack();
    }
  }, [userId, isTalent, talent, updateTalent, origin]);

  // Subscribe to realtime updates
  useKycStatusSubscription({
    userId,
    enabled: !!userId && !hasNavigatedRef.current,
    onStatusChange: data => {
      setCurrentChecksPassed(data.checksPassed);

      if (data.status === 'completed') {
        setState('completed');
        setCurrentChecksPassed(TOTAL_CHECKS);
        handleVerificationSuccess();
      } else if (data.status === 'failed') {
        setState('failed');
      }
    },
  });

  // Handle completed state from initial load
  useEffect(() => {
    if (state === 'completed' && !hasNavigatedRef.current) {
      handleVerificationSuccess();
    }
  }, [state, handleVerificationSuccess]);

  // Block back button on Android
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const handleRetry = useCallback(() => {
    hasNavigatedRef.current = false;
    setState('pending');
    setCurrentChecksPassed(0);

    if (origin === 'talent_onboarding') {
      goToScreen(Screens.OnboardingAuthTalent);
    } else if (origin === 'org_onboarding') {
      goToScreen(Screens.OrgIdentityVerification);
    } else {
      goBack();
    }
  }, [origin]);

  return {
    currentChecksPassed,
    totalChecks: TOTAL_CHECKS,
    handleRetry,
    isFailed: state === 'failed',
  };
};
