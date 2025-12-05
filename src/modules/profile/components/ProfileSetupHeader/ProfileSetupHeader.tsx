import { AppText } from '@ui';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { ProfileSetupHeaderProps } from './types';
import { If } from '@components';
import { COLORS } from '@styles';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';

export const ProfileSetupHeader = ({
  containerStyle,
  showCircleBadge,
  showUnverifiedBadge,
  showCnBadge,
  cnBadgeColor,
  circleBadgeStyle,
  cnBadgeStyle,
  showCamera,
}: ProfileSetupHeaderProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity activeOpacity={0.9} style={styles.imageContainer}>
        <If condition={!!showCamera}>
          <View style={styles.cameraContainer}>
            <SvgXml xml={ICONS.camera('black')} width={16} height={13} />
          </View>
        </If>

        <SvgXml
          xml={ICONS.avatar('gray')}
          width={112}
          height={112}
          opacity={0.2}
        />

        <If condition={!!showCircleBadge}>
          <View
            style={[
              styles.circleBadge,
              !showUnverifiedBadge && { bottom: 5 },
              circleBadgeStyle,
            ]}
          />
        </If>

        <If condition={!!showUnverifiedBadge}>
          <View style={styles.unverifiedBadge}>
            <AppText color="white" typography="bold_10">
              Unverified
            </AppText>
          </View>
        </If>
      </TouchableOpacity>

      <View>
        <View style={styles.nameContainer}>
          <AppText color="black" typography="semibold_20">
            Mia
          </AppText>

          <If condition={!!showCnBadge}>
            <View
              style={[
                styles.cnBadge,
                { borderColor: COLORS[cnBadgeColor || 'red'] },
                cnBadgeStyle,
              ]}
            >
              <AppText color={cnBadgeColor || 'red'} typography="semibold_8">
                CN
              </AppText>
            </View>
          </If>
        </View>

        <AppText color="black" typography="regular_16" margin={{ bottom: 2 }}>
          Female, 32
        </AppText>
        <AppText color="black_60" typography="regular_16">
          VIC
        </AppText>
      </View>
    </View>
  );
};
