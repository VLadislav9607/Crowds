import { useRef, useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { AppBottomSheet, AppModal, If } from '@components';
import { AppButton, AppText } from '@ui';
import { useDeleteAccount, removePushDevice } from '@actions';
import { queryClient, supabase, realtimeService } from '@services';
import { resetToScreen, Screens } from '@navigation';
import { showErrorToast } from '@helpers';
import { COLORS } from '@styles';

import { TERMS_LINKS } from '@constants';

import { LogoutModal, LogoutModalRef } from '../../modals';
import { ProfileScreenLayout } from '../../layouts';
import { styles } from './styles';
import { useProfileTabOptions } from '../../hooks';

export const ProfileScreenTab = () => {
  const logoutModalRef = useRef<LogoutModalRef>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const termsSheetRef = useRef<BottomSheetModal>(null);
  const { mutateAsync: deleteAccount, isPending: isDeleting } =
    useDeleteAccount();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(undefined);
      setShowDeleteModal(false);
      await removePushDevice();
      realtimeService.unsubscribeAll();
      await supabase.auth.signOut();
      queryClient.clear();
      resetToScreen(Screens.First);
    } catch {
      showErrorToast('Failed to delete account. Please try again.');
    }
  };

  const options = useProfileTabOptions({
    onLogout: () => logoutModalRef.current?.open({}),
    onDeleteAccount: () => setShowDeleteModal(true),
    onTermsOfService: () => termsSheetRef.current?.present(),
  });

  return (
    <ProfileScreenLayout>
      {options.map((option, index) => {
        if (option.isInvisible) return null;
        const isLastItem = index === options.length - 1;
        return (
          <View key={option.title}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <SvgXml xml={option.icon} width={20} height={20} />
              <AppText color={option.textColor || 'black'} typography="bold_14">
                {option.title}
              </AppText>
            </TouchableOpacity>
            <If condition={!isLastItem}>
              <View style={styles.divider} />
            </If>
          </View>
        );
      })}

      <LogoutModal ref={logoutModalRef} />

      <AppBottomSheet bottomSheetRef={termsSheetRef} enableDynamicSizing>
        <BottomSheetView style={styles.termsSheetContent}>
          <AppText typography="bold_20" color="black" style={styles.termsSheetTitle}>
            Terms of Service
          </AppText>
          {TERMS_LINKS.map(link => (
            <TouchableOpacity
              key={link.url}
              style={styles.termsLinkItem}
              onPress={() => Linking.openURL(link.url)}
            >
              <AppText typography="regular_14" color="main">
                {link.label}
              </AppText>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </AppBottomSheet>

      <AppModal
        isVisible={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        title="Delete Account"
        subtitle="Your account will be scheduled for deletion. You will have 30 days to restore it before all data is permanently removed."
        subtitleProps={{ typography: 'regular_14', margin: { top: 5 } }}
      >
        <AppButton
          title="Yes, delete my account"
          size="60"
          wrapperStyles={{ backgroundColor: COLORS.red }}
          mb={10}
          isLoading={isDeleting}
          onPress={handleDeleteAccount}
        />
        <AppButton
          title="Cancel"
          size="60"
          variant="withBorder"
          onPress={() => setShowDeleteModal(false)}
          isDisabled={isDeleting}
        />
      </AppModal>
    </ProfileScreenLayout>
  );
};
