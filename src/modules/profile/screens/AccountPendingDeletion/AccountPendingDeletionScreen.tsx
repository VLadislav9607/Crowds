import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppButton, AppText } from '@ui';
import { useGetMe, useRestoreAccount } from '@actions';
import { queryClient, supabase, realtimeService } from '@services';
import { resetToScreen, Screens } from '@navigation';
import { showErrorToast } from '@helpers';
import { COLORS } from '@styles';
import { removePushDevice } from '@actions';
import { SafeAreaView } from 'react-native-safe-area-context';

const DELETION_PERIOD_DAYS = 30;

const getDeletionDate = (deletedAt: string | null): string => {
  if (!deletedAt) return '';
  const date = new Date(deletedAt);
  date.setDate(date.getDate() + DELETION_PERIOD_DAYS);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const AccountPendingDeletionScreen = () => {
  const { talent, organizationMember, isTalent } = useGetMe();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const deletedAt = isTalent
    ? talent?.deleted_at
    : (organizationMember as any)?.deleted_at;

  const deletionDate = getDeletionDate(deletedAt ?? null);

  const { mutateAsync: restoreAccount, isPending: isRestoring } =
    useRestoreAccount();

  const handleRestore = async () => {
    try {
      await restoreAccount();
      queryClient.clear();
      resetToScreen(Screens.SignIn);
    } catch {
      showErrorToast('Failed to restore account. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await removePushDevice();
      realtimeService.unsubscribeAll();
      await supabase.auth.signOut();
      queryClient.clear();
      resetToScreen(Screens.First);
    } catch {
      showErrorToast('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isLoading = isRestoring || isLoggingOut;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <AppText typography="extra_bold_26" color="main">
              !
            </AppText>
          </View>

          <AppText
            typography="h3"
            color="typography_black"
            style={styles.title}
          >
            Account scheduled{'\n'}for deletion
          </AppText>

          <AppText
            typography="regular_16"
            color="grayscale_500"
            style={styles.subtitle}
          >
            Your account and all associated data will be permanently deleted on{' '}
            <AppText typography="bold_16" color="typography_black">
              {deletionDate}
            </AppText>
            .
          </AppText>

          <AppText
            typography="regular_14"
            color="grayscale_500"
            style={styles.description}
          >
            If you change your mind, you can restore your account before that
            date and continue using the app as usual.
          </AppText>
        </View>

        <View style={styles.buttons}>
          <AppButton
            title="Restore my account"
            size="60"
            mb={12}
            onPress={handleRestore}
            isLoading={isRestoring}
            isDisabled={isLoading}
          />
          <AppButton
            title="Log out"
            size="60"
            variant="withBorder"
            onPress={handleLogout}
            isLoading={isLoggingOut}
            isDisabled={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.main_10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  buttons: {
    paddingBottom: 24,
  },
});
