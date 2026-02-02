import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ChatButtonProps } from './types';
import { styles } from './styles';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { AppText } from '@ui';
import { COLORS } from '@styles';

export const ChatButton = ({
  topText,
  bottomText,
  isLoading,
  ...props
}: ChatButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      disabled={isLoading}
      style={[styles.container, props.style]}
    >
      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          color={COLORS.gray}
          size="small"
        />
      ) : null}

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
