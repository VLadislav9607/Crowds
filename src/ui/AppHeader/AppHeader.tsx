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
    paddingTop: 20,
    backgroundColor: COLORS[colorHeader || 'main'],
    ...headerStyles,
  };

  return (
    <>
      <If condition={headerVariant === 'withLogo'}>
        <View style={[headerStyle, styles.headerWithLogo]}>
          <SvgXml xml={ICONS.fullLogo()} />
          {customElement}
        </View>
      </If>

      <If condition={headerVariant === 'withTitle'}>
        <View style={[headerStyle, styles.withTitle, styles.headerContainer]}>
          <HeaderContent
            title={title}
            showBackButton
            onBackPress={handleBackPress}
          />
          {rightIcons && <RightIcons rightIcons={rightIcons} />}
        </View>
        {customElement}
      </If>

      <If condition={headerVariant === 'withTitleAndImageBg'}>
        <ImageBackground
          resizeMode="stretch"
          source={headerImageBgMap[headerImageBg || 'purple']}
          style={[headerStyle, styles.withTitleAndImageBg]}
        >
          <View style={styles.overlay} />
          <View style={[styles.contentWrapper, styles.headerContainer]}>
            <HeaderContent
              title={title}
              showBackButton
              onBackPress={handleBackPress}
            />
            {rightIcons && <RightIcons rightIcons={rightIcons} />}
            {customElement}
          </View>
        </ImageBackground>
      </If>

      <If condition={headerVariant === 'withLogoAndImageBg'}>
        <ImageBackground
          resizeMode="stretch"
          source={headerImageBgMap[headerImageBg || 'purple']}
          style={[headerStyle, styles.withTitleAndImageBg]}
        >
          <View style={styles.overlay} />
          <View style={[styles.contentWrapperLogo, styles.headerContainer]}>
            <SvgXml xml={ICONS.fullLogo()} width={182} height={42} />
            {rightIcons && <RightIcons rightIcons={rightIcons} />}
            {customElement}
          </View>
        </ImageBackground>
      </If>
    </>
  );
};

const HeaderContent = ({
  title,
  showBackButton,
  onBackPress,
}: {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}) => (
  <>
    {showBackButton && onBackPress && (
      <Pressable onPress={onBackPress}>
        <SvgXml xml={ICONS.goBackArrow()} style={styles.backButton} />
      </Pressable>
    )}
    {title && (
      <AppText numberOfLines={1} style={styles.title}>
        {title}
      </AppText>
    )}
  </>
);

const RightIcons = ({
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
        <Pressable key={icon()} hitSlop={10} onPress={onPress}>
          <SvgXml xml={icon()} width={24} height={24} />
        </Pressable>
      ))}
    </View>
  );
};
