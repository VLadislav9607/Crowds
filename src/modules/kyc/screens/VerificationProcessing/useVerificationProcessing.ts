import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, BackHandler } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useGetMe, useUpdateTalent } from '@actions';
import { goToScreen, goBack, Screens, RootStackParamList } from '@navigation';
import {
  useIsUserVerified,
  invalidateUserKycStatus,
  removeUserKycStatus,
} from '../../hooks/useIsUserVerified';

type VerificationProcessingRoute = RouteProp<
  RootStackParamList,
  Screens.VerificationProcessing
>;

type VerificationState = 'pending' | 'completed' | 'failed' | 'expired_document';
type FailureReason = 'underage' | 'dob_not_found' | 'client_data_consistency' | null;

const TOTAL_CHECKS = 2;
const ANIMATION_STEP_MS = 300;

export const useVerificationProcessing = () => {
  const route = useRoute<VerificationProcessingRoute>();
  const { origin } = route.params;

  const { me, isTalent, talent } = useGetMe();
  const { mutateAsync: updateTalent } = useUpdateTalent();
  const userId = me?.id || '';

  // Clear stale KYC cache on mount so we always start from a fresh pending state
  useEffect(() => {
    if (userId) {
      removeUserKycStatus(userId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState<VerificationState>('pending');
  const [failureReason, setFailureReason] = useState<FailureReason>(null);
  const [displayedChecks, setDisplayedChecks] = useState(0);
  const hasNavigatedRef = useRef(false);
  const animatingRef = useRef(false);

  const { kycStatus, checksPassed, failureReason: kycFailureReason, isFetching } = useIsUserVerified({
    userId,
    refetchInterval: state === 'pending' ? 3000 : false,
  });

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
      goToScreen(Screens.TermsAgreement, { origin: 'talent_onboarding' });
    } else if (origin === 'org_onboarding') {
      goToScreen(Screens.TermsAgreement, { origin: 'org_onboarding' });
    } else {
      goBack();
    }
  }, [userId, isTalent, talent, updateTalent, origin]);

  // Animate checks stepping up one by one toward the server value
  useEffect(() => {
    const serverChecks = checksPassed ?? 0;
    if (serverChecks <= displayedChecks || animatingRef.current) return;

    animatingRef.current = true;

    const step = () => {
      setDisplayedChecks(prev => {
        const next = prev + 1;
        if (next < serverChecks) {
          setTimeout(step, ANIMATION_STEP_MS);
        } else {
          animatingRef.current = false;
        }
        return next;
      });
    };

    setTimeout(step, ANIMATION_STEP_MS);
  }, [checksPassed, displayedChecks]);

  // React to status changes from polling
  useEffect(() => {
    if (kycStatus === 'completed' && state !== 'completed') {
      setState('completed');
    } else if (kycStatus === 'expired_document' && state !== 'expired_document') {
      setState('expired_document');
    } else if (kycStatus === 'failed' && state !== 'failed' && !isFetching) {
      setState('failed');
      setFailureReason(kycFailureReason);
    }
  }, [kycStatus, state, isFetching, kycFailureReason]);

  // Navigate after animation finishes and state is completed
  useEffect(() => {
    if (
      state === 'completed' &&
      displayedChecks >= TOTAL_CHECKS &&
      !hasNavigatedRef.current
    ) {
      handleVerificationSuccess();
    }
  }, [state, displayedChecks, handleVerificationSuccess]);

  // Timeout: if still pending after 60s, treat as failed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (state === 'pending' && !hasNavigatedRef.current) {
        setState('failed');
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, [state]);

  // Re-fetch KYC status when app returns from background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active' && userId && !hasNavigatedRef.current) {
        invalidateUserKycStatus(userId);
      }
    });
    return () => subscription.remove();
  }, [userId]);

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
    animatingRef.current = false;
    setState('pending');
    setDisplayedChecks(0);

    if (origin === 'talent_onboarding') {
      goToScreen(Screens.OnboardingAuthTalent);
    } else if (origin === 'org_onboarding') {
      goToScreen(Screens.OrgIdentityVerification);
    } else {
      goBack();
    }
  }, [origin]);

  return {
    currentChecksPassed: displayedChecks,
    totalChecks: TOTAL_CHECKS,
    handleRetry,
    isFailed: state === 'failed',
    isUnderage: state === 'failed' && failureReason === 'underage',
    isDobNotFound: state === 'failed' && failureReason === 'dob_not_found',
    isClientDataConsistency: state === 'failed' && failureReason === 'client_data_consistency',
    isExpiredDocument: state === 'expired_document',
  };
};
