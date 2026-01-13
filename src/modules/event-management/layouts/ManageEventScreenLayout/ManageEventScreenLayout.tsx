import { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { AppText } from '@ui';
import { IMAGES } from '@assets';

interface IProps {
  children: ReactNode;
  eventTitle: string;
  eventLocation: string;
  eventImage?: any;
}

export const ManageEventScreenLayout = ({
  children,
  eventTitle,
  eventLocation,
  eventImage,
}: IProps) => {
  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      headerImageBg="crowd"
      title="Manage Event"
      headerStyles={styles.header}
      contentContainerStyle={styles.contentContainer}
      customElement={
        <View style={styles.headerContent}>
          <View style={styles.headerContentTitle}>
            <AppText numberOfLines={2} typography="extra_bold_22" color="white">
              {eventTitle}
            </AppText>
            <AppText numberOfLines={1} typography="bold_12" color="white">
              {eventLocation}
            </AppText>
          </View>
          <Image
            source={eventImage || IMAGES.splash}
            style={styles.headerContentImage}
          />
        </View>
      }
    >
      {children}
    </ScreenWithScrollWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 230,
    justifyContent: 'flex-start',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  headerContentTitle: {
    flex: 1,
    gap: 4,
  },
  headerContentImage: {
    width: 69,
    height: 69,
    borderRadius: 10,
  },
  contentContainer: {
    paddingTop: 32,
    flexGrow: 1,
  },
});
