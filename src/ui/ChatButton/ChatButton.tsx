import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ChatButtonProps } from './types';
import { styles } from './styles';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { If, Skeleton } from '@components';

export const ChatButton = ({
  topText,
  bottomText,
  isLoading,
  showSkeleton = false,
  ...props
}: ChatButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      disabled={isLoading}
      style={[styles.container, showSkeleton && styles.borderNone, props.style]}
    >
      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          color={COLORS.gray}
          size="small"
        />
      ) : null}
      <If condition={showSkeleton}>
        <View style={styles.skeletonContainer}>
          <Skeleton>
            <Skeleton.Item width={'100%'} height={'100%'} />
          </Skeleton>
        </View>
      </If>

      <SvgXml
        xml={ICONS.chatSquare(isLoading ? 'gray' : 'main')}
        width={30}
        height={30}
      />

      <View style={styles.textWrapper}>
        <View>
          <AppText typography="regular_14" color={isLoading ? 'gray' : 'black'}>
            {topText}
          </AppText>
          <AppText
            typography="semibold_18"
            color={isLoading ? 'gray' : 'black'}
          >
            {bottomText}
          </AppText>
        </View>
        <SvgXml
          xml={ICONS.chevronRight(isLoading ? 'gray' : 'main')}
          width={28}
          height={28}
        />
      </View>
    </TouchableOpacity>
  );
};
