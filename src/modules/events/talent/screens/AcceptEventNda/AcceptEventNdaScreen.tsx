import { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';
import { SvgXml } from 'react-native-svg';
import { AppButton, AppCheckbox, AppText } from '@ui';
import { If } from '@components';
import { COLORS } from '@styles';
import { ICONS } from '@assets';
import { goBack, Screens, useScreenNavigation } from '@navigation';
import { useAcceptEventNda, useGetFileUrl } from '@actions';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { showSuccessToast, showMutationErrorToast } from '@helpers';
import { styles } from './styles';

export const AcceptEventNdaScreen = () => {
  const insets = useSafeAreaInsets();
  const { params, navigation } = useScreenNavigation<Screens.AcceptEventNda>();
  const [isChecked, setIsChecked] = useState(false);

  const { data: fileUrl, isLoading: isUrlLoading } = useGetFileUrl({
    bucket: 'event_nda',
    path: params?.ndaFilePath,
  });

  const { mutate: acceptNda, isPending } = useAcceptEventNda({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
      });
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER],
      });
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
      });
      showSuccessToast('NDA accepted successfully');
      navigation.replace(Screens.TalentEventDetails, {
        participationId: params?.participationId!,
        eventId: params?.eventId!,
      });
    },
    onError: (error: Error) => {
      showMutationErrorToast(error);
    },
  });

  const handleAccept = () => {
    acceptNda({ eventId: params?.eventId! });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <SvgXml xml={ICONS.arrowLeft()} width={18} height={15} />
        </TouchableOpacity>

        <AppText color="black" typography="bold_16">
          Event NDA
        </AppText>

        <View style={styles.headerSpacer} />
      </View>

      <If condition={isUrlLoading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      </If>

      <If condition={!isUrlLoading && !!fileUrl?.url}>
        <Pdf source={{ uri: fileUrl?.url }} style={styles.pdf} />
      </If>

      <View
        style={[styles.bottomSection, { paddingBottom: insets.bottom + 16 }]}
      >
        <AppCheckbox
          type="square"
          checked={isChecked}
          onChange={setIsChecked}
          label="I have read and accept the NDA"
          color="main"
        />

        <AppButton
          title="Accept NDA"
          isDisabled={!isChecked}
          isLoading={isPending}
          onPress={handleAccept}
        />
      </View>
    </View>
  );
};
