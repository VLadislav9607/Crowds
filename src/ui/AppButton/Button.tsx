import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { If } from '@components';
import { AppText } from '../AppText';
import { ButtonProps } from './types';
import { styles } from './styles';
import { ICON_SIZES, SIZES, VARIANTS, LOADING_SIZES } from './constants';

export const AppButton = ({
  title,
  onPress,
  size = '56',
  width,
  mb = 0,
  variant = 'primary',
  isDisabled = false,
  isLoading = false,
  loadingColor = 'white',
  icon = null,
  iconPlace = 'left',
  iconSize,
  iconStyle = {},
  wrapperStyles,
  titleStyles,
  children,
}: ButtonProps) => {
  const adaptiveIconSize = ICON_SIZES[size];
  const loadingSize = LOADING_SIZES[size];
  const { buttonStyles, textStyles, disabledButton, disabledText } =
    VARIANTS[variant];

  const combinedButtonStyles = isDisabled
    ? { ...buttonStyles, ...disabledButton }
    : buttonStyles;

  const combinedTextStyles = isDisabled
    ? { ...textStyles, ...disabledText }
    : textStyles;

  const { buttonSizeStyle, textSizeStyles } = SIZES[size];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.buttonWrapper,
        combinedButtonStyles,
        buttonSizeStyle,
        { marginBottom: mb },
        wrapperStyles,
        /* eslint-disable react-native/no-inline-styles */
        width ? { width, paddingHorizontal: 0 } : {},
        { flexDirection: iconPlace === 'right' ? 'row-reverse' : 'row' },
      ]}
      onPress={onPress}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={loadingColor} size={loadingSize} />
      ) : (
        <>
          <If condition={!!icon}>
            <View style={styles.iconWrapper}>
              <SvgXml
                xml={icon}
                width={iconSize || adaptiveIconSize}
                height={iconSize || adaptiveIconSize}
                style={iconStyle}
              />
            </View>
          </If>

          <View style={styles.textWrapper}>
            <AppText
              style={[
                styles.mainTextStyles,
                combinedTextStyles,
                textSizeStyles,
                titleStyles,
              ]}
            >
              {title}
            </AppText>
            {children}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
