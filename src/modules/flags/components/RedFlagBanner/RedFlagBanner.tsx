import { View } from 'react-native';
import { Skeleton } from '@components';
import { AppText } from '@ui';
import { formatDate } from '@utils';

import { getReasonLabel } from '../../helpers';
import { useMyActiveFlag } from '../../hooks';
import { styles } from './styles';

const BannerSkeleton = () => (
  <View style={styles.skeletonCard}>
    <Skeleton>
      <Skeleton.Item width="80%" height={16} borderRadius={4} />
      <Skeleton.Item width="30%" height={12} borderRadius={4} marginTop={16} />
      <Skeleton.Item width="60%" height={14} borderRadius={4} marginTop={6} />
      <Skeleton.Item width="40%" height={12} borderRadius={4} marginTop={16} />
    </Skeleton>
  </View>
);

export const RedFlagBanner = () => {
  const { data: flag, isLoading } = useMyActiveFlag();

  const reasonLabel = flag
    ? getReasonLabel(flag.reason, flag.description)
    : null;
  const expiresFormatted = flag?.expires_on
    ? formatDate(flag.expires_on, 'MMM dd, yyyy')
    : null;

  return (
    <View style={styles.container}>
      {isLoading || !flag ? (
        <BannerSkeleton />
      ) : (
        <View style={styles.noticeCard}>
          <AppText typography="regular_14" style={styles.message}>
            Your account has been banned. Access to the platform is restricted.
          </AppText>

          <AppText
            typography="semibold_12"
            color="black_60"
            style={styles.label}
          >
            Reason
          </AppText>
          <AppText typography="regular_14" style={styles.value}>
            {reasonLabel}
          </AppText>

          {expiresFormatted ? (
            <View style={styles.expiresRow}>
              <AppText typography="semibold_12" color="black_60">
                Valid until{' '}
              </AppText>
              <AppText typography="regular_14">{expiresFormatted}</AppText>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};
