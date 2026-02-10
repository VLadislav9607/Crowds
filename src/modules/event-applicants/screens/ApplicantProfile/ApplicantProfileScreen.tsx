import { View, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { AppText } from '@ui';
import { ScreenWithScrollWrapper, AppImage } from '@components';
import { useGetTalentFullProfile } from '@actions';
import { useScreenNavigation, Screens } from '@navigation';
import { TalentFlag, useAnimatedScrollHeader } from '@modules/common';
import { formatPhysicalDetailsForDisplay } from '@modules/profile';

import { styles } from './styles';
import { HeaderTalentProfile, PhysicalDetailsList, TagsList } from '../../ui';

export const ApplicantProfileScreen = () => {
  const { params } = useScreenNavigation<Screens.ApplicantProfile>();

  const {
    data: profile,
    isLoading,
    error,
  } = useGetTalentFullProfile(params?.applicantId);

  const { scrollHandler, animatedHeaderStyle } = useAnimatedScrollHeader();

  if (isLoading) {
    return (
      <ScreenWithScrollWrapper
        title="View Applicant Profile"
        headerVariant="withTitle"
        contentContainerStyle={[styles.contentContainer, styles.centered]}
      >
        <ActivityIndicator size="large" />
      </ScreenWithScrollWrapper>
    );
  }

  if (error || !profile) {
    return (
      <ScreenWithScrollWrapper
        title="View Applicant Profile"
        headerVariant="withTitle"
        contentContainerStyle={[styles.contentContainer, styles.centered]}
      >
        <AppText style={styles.description}>
          {error?.message ?? 'Failed to load profile'}
        </AppText>
      </ScreenWithScrollWrapper>
    );
  }

  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(' ');

  const rawPhysicalDetails =
    profile.physical_details?.filter(it => !!it?.value) || [];
  const physicalDetails = formatPhysicalDetailsForDisplay(rawPhysicalDetails);
  const hasPhysicalDetails = physicalDetails.length > 0;
  const hasTags = (profile.tags?.length ?? 0) > 0;

  return (
    <ScreenWithScrollWrapper
      title="View Applicant Profile"
      headerVariant="withTitleAndImageBg"
      contentContainerStyle={styles.contentContainer}
      headerStyles={styles.headerStyles}
      animatedScrollHandler={scrollHandler}
      useAnimatedScrollView
      customElement={
        <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
          <HeaderTalentProfile
            flag={profile.flag as TalentFlag}
            birthDate={profile.birth_date || ''}
            gender={profile.gender}
            location={profile.address || ''}
            avatarUrl={profile.avatar_path || ''}
            fullName={fullName}
          />
        </Animated.View>
      }
    >
      <View style={styles.section}>
        <AppText style={styles.label}>Physical Details</AppText>
        {hasPhysicalDetails ? (
          <PhysicalDetailsList details={physicalDetails} />
        ) : (
          <AppText style={styles.description}>—</AppText>
        )}
      </View>

      <View>
        <AppText style={styles.label}>Photo</AppText>
        {profile.avatar_full_path ? (
          <View style={styles.photoContainer}>
            <AppImage
              bucket="talents_avatars"
              imgPath={profile.avatar_full_path}
              containerStyle={styles.photo}
            />
          </View>
        ) : (
          <AppText style={styles.description}>—</AppText>
        )}
      </View>

      <View>
        <AppText style={styles.label}>Tags</AppText>
        {hasTags ? (
          <TagsList tags={profile.tags} />
        ) : (
          <AppText style={styles.description}>—</AppText>
        )}
      </View>

      <View>
        <AppText style={styles.label}>Availability</AppText>
        <AppText style={styles.availability}>
          ◉{' '}
          {profile.availability === 'available'
            ? 'Available for this month'
            : profile.availability}
        </AppText>
      </View>
    </ScreenWithScrollWrapper>
  );
};
