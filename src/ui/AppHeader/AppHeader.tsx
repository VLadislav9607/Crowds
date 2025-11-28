import { View, ImageBackground, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { AppText } from '@ui';
import { goBack } from '@navigation';
import { If } from '@components';

import { headerImageBgMap, IAppHeaderProps } from './types';
import { styles } from './styles';

export const AppHeader = ({
  title,
  customElement,
  headerImageBg,
  headerStyles,
  colorHeader,
  headerVariant,
  rightIcons,
  goBackCallback,
}: IAppHeaderProps) => {
  const handleBackPress = () => {
    goBack();
    goBackCallback?.();
  };

  const headerStyle = {
    ...styles.header,
    paddingTop: 8,
    backgroundColor: COLORS[colorHeader || 'main'],
    ...headerStyles,
  };

  const showOverlay = headerImageBg === 'purple';

  return (
    <>
      <If condition={headerVariant === 'withLogo'}>
        <View style={[headerStyle, styles.headerWithLogo]}>
          <SvgXml xml={ICONS.fullLogo()} />
          {customElement}
        </View>
      </If>

      <If condition={headerVariant === 'withTitle'}>
        <View style={[headerStyle, styles.withTitle]}>
          <HeaderContent
            title={title}
            rightIcons={rightIcons}
            showBackButton
            onBackPress={handleBackPress}
          />
        </View>
        {customElement}
      </If>

      <If condition={headerVariant === 'withTitleAndImageBg'}>
        <ImageBackground
          resizeMode="stretch"
          source={headerImageBgMap[headerImageBg || 'purple']}
          style={[headerStyle, styles.withTitleAndImageBg]}
        >
          {showOverlay && <View style={styles.overlay} />}
          <HeaderContent
            title={title}
            rightIcons={rightIcons}
            showBackButton
            onBackPress={handleBackPress}
          />
          {customElement}
        </ImageBackground>
      </If>

      <If condition={headerVariant === 'withLogoAndImageBg'}>
        <ImageBackground
          resizeMode="stretch"
          source={headerImageBgMap[headerImageBg || 'purple']}
          style={[headerStyle, styles.withTitleAndImageBg]}
        >
          {showOverlay && <View style={styles.overlay} />}
          <SvgXml xml={ICONS.fullLogo()} width={164} height={34} />
          <RightIconComponent rightIcons={rightIcons} />
          {customElement}
        </ImageBackground>
      </If>
    </>
  );
};

const HeaderContent = ({
  title,
  rightIcons,
  showBackButton,
  onBackPress,
}: {
  title?: string;
  rightIcons?: {
    icon: () => string | null;
    onPress: () => void;
  }[];
  showBackButton?: boolean;
  onBackPress?: () => void;
}) => (
  <>
    {showBackButton && onBackPress && (
      <Pressable onPress={onBackPress}>
        <SvgXml xml={ICONS.goBackArrow()} style={styles.backIcon} />
      </Pressable>
    )}
    {title && (
      <AppText numberOfLines={1} style={styles.title}>
        {title}
      </AppText>
    )}
    <RightIconComponent rightIcons={rightIcons} />
  </>
);

const RightIconComponent = ({
  rightIcons,
}: {
  rightIcons?: {
    icon: () => string | null;
    onPress: () => void;
  }[];
}) => {
  if (!rightIcons) return null;
  return (
    <View style={styles.rightIconsWrapper}>
      {rightIcons.map(({ icon, onPress }) => (
        <Pressable key={icon()} onPress={onPress}>
          <SvgXml xml={icon()} width={24} height={24} />
        </Pressable>
      ))}
    </View>
  );
};
