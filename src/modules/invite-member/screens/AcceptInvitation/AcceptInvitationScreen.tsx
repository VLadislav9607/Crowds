import { useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { ScreenWrapper } from '@components';
import { AppButton, AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { GetTeamInvitationResDto, useGetTeamInvitation } from '@actions';
import { goBack, goToScreen, Screens, RootStackParamList } from '@navigation';

type AcceptInvitationRouteProp = RouteProp<
  RootStackParamList,
  Screens.AcceptInvitation
>;

export const AcceptInvitationScreen = () => {
  const route = useRoute<AcceptInvitationRouteProp>();
  const { token } = route.params;
  const hasNavigated = useRef(false);

  const onInvitationSuccess = (data: GetTeamInvitationResDto) => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    goToScreen(Screens.OnboardingUnAuthTeamMember, {
      token,
      invitation: data,
    });
  };

  const getInvitation = useGetTeamInvitation({
    onSuccess: onInvitationSuccess,
  });

  useEffect(() => {
    hasNavigated.current = false;
    getInvitation.mutate({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const error = getInvitation.error as { message?: string } | null;

  if (error) {
    return (
      <ScreenWrapper
        headerVariant="withTitleAndImageBg"
        title="Team Invitation"
        headerImageBg="purple"
        contentContainerStyle={styles.centerContainer}
      >
        <AppText style={styles.errorTitle}>Invalid Invitation</AppText>
        <AppText style={styles.errorText}>
          {error?.message || 'This invitation is no longer valid.'}
        </AppText>
        <AppButton
          variant="withBorder"
          title="Go Back"
          titleStyles={styles.goBackButtonTitle}
          onPress={goBack}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Team Invitation"
      headerImageBg="purple"
      contentContainerStyle={styles.centerContainer}
    >
      <ActivityIndicator size="large" color={COLORS.main} />
      <AppText style={styles.loadingText}>Loading invitation...</AppText>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...TYPOGRAPHY.medium_14,
    marginTop: 16,
    color: COLORS.dark_gray,
  },
  errorTitle: {
    ...TYPOGRAPHY.h4,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    ...TYPOGRAPHY.medium_14,
    textAlign: 'center',
    color: COLORS.dark_gray,
    marginBottom: 24,
  },
  goBackButtonTitle: {
    color: COLORS.black,
  },
});
